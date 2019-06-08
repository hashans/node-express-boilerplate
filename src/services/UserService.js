
export default class UserService {
    constructor(userRepository, q, constants, bcrypt, config, jwt) {
        this.userRepository = userRepository;
        this.q = q;
        this.constants = constants;
        this.bcrypt = bcrypt;
        this.config = config;
        this.jwt = jwt;
    }


    addUser(firstName, lastName, email, password) {

        return this.userRepository.getUserByEmail(email)
            .then(user => {
                if (!user) {
                    return this.bcrypt.hash(password, 11)
                        .then(hashedPassword => {
                            return this.userRepository.addUser(firstName, lastName, email, hashedPassword)
                                .then(result => {
                                    return this.q.when(result);
                                })
                        })

                } else {
                    return this.q.when({status: this.constants.CONFLICT});
                }

            });
    }

    authenticateUser(email, password) {
        return this.userRepository.getUserByEmail(email)
            .then(user => {
                if (user) {
                    return this.bcrypt.compare(password, user.password)
                        .then((result) => {
                            if (result) {
                                let payload = {
                                    id: user._id.toString(),
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email
                                };

                                let token = this.jwt.sign(payload, this.config.bcryptSecret, {
                                    expiresIn: "7d"
                                });

                                let responseObject = {
                                    token: token,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email
                                };
                                return responseObject;
                            } else {
                                return this.q.when({status: this.constants.FORBIDDEN});
                            }
                        })

                } else {
                    return this.q.when({status: this.constants.FORBIDDEN});
                }

            });
    }
}