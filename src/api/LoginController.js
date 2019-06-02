let self;

export default class LoginController {
    constructor(express) {
        self = this;
        self.expressRouter = new express.Router();


        self.expressRouter.post('', self.login);
        self.expressRouter.get('', self.loginTest);
        return self.expressRouter;


    }

    login(req, res, next) {
        let email = req.body.email;
        let password = req.body.password;

    }


    loginTest(req, res, next) {
        res.json({msg: "Login"});

    }
}