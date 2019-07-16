let self;

export default class UserService {
  constructor(userRepository, q, constants, bcrypt, config, jwt) {
    self = this;
    self.userRepository = userRepository;
    self.q = q;
    self.constants = constants;
    self.bcrypt = bcrypt;
    self.config = config;
    self.jwt = jwt;
  }


  addUser(firstName, lastName, email, password) {

    return self.userRepository.getUserByEmail(email)
      .then(user => {
        if (!user) {
          return self.bcrypt.hash(password, 11)
            .then(hashedPassword => {
              return self.userRepository.addUser(firstName, lastName, email, hashedPassword)
                .then(result => {
                  result.password = result.createdAt = result.__v = undefined;
                  return self.q.when(result);
                })
            })

        } else {
          return self.q.reject({status: self.constants.CONFLICT});
        }

      });
  }

  getUserById(id) {
    return self.userRepository.getUserById(id)
      .then(user => {
        if(user) {
          user.password = user.createdAt = user.__v = undefined;
          return self.q.when(user);
        }
        else return self.q.reject(self.constants.NOT_FOUND);
      });
  }

  authenticateUser(email, password) {
    return self.userRepository.getUserByEmail(email)
      .then(user => {
        if (user) {
          return self.bcrypt.compare(password, user.password)
            .then((result) => {
              if (result) {
                let payload = {
                  id: user._id.toString(),
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email
                };

                let token = self.jwt.sign(payload, self.config.bcryptSecret, {
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
                return self.q.when({status: self.constants.FORBIDDEN});
              }
            })

        } else {
          return self.q.reject({status: self.constants.UNAUTHORIZED});
        }

      });
  }
}