let self;

export default class RegisterController {
  constructor(express, userService, constants, configErrors) {
    self = this;
    self.expressRouter = new express.Router();
    self.userService = userService;
    self.constants = constants;
    self.configErrors = configErrors;

    self.expressRouter.post('', self.register);
    return self.expressRouter;


  }

  register(req, res, next) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;

    self.userService.addUser(firstName, lastName, email, password)
      .then(result => {
        res.status(self.constants.CREATED).json(result);
      })
      .catch(err => {
        if(err.status && err.status === self.constants.CONFLICT) {
          res.status(self.constants.CONFLICT).send({msg: self.configErrors.E0001});
        } else {
          console.error(err);
          res.status(self.constants.INTERNAL_ERROR).send({msg: self.configErrors.E0000});
        }
      });

  }

}