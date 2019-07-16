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
        res.status(self.constants.SUCCESS).json(result);
      })
      .catch(err => {
        if(err.status && err.status === self.constants.UNAUTHORIZED) {
          res.status(self.constants.FORBIDDEN).send({msg: self.configErrors.E0002});
        } else {
          console.error(err);
          res.status(self.constants.INTERNAL_ERROR).send({msg: self.configErrors.E0000});
        }
      })

  }

}