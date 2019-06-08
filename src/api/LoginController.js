import configErrors from "../config/configErrors";

let self;

export default class LoginController {
    constructor(express, userService, constants, configErrors) {
        self = this;
        self.expressRouter = new express.Router();
        self.userService = userService;
        self.constants = constants;
        self.configErrors = configErrors;

        self.expressRouter.post('', self.login);
        return self.expressRouter;


    }

    login(req, res, next) {
        let email = req.body.email;
        let password = req.body.password;

        self.userService.authenticateUser(email, password)
            .then(result => {
                console.log('result', result);
                if (result && result.status && result.status === self.constants.FORBIDDEN) {
                    res.status(self.constants.FORBIDDEN).send({msg: configErrors.E0002});
                } else {
                    res.status(self.constants.SUCCESS).json(result);
                }

            })

    }

}