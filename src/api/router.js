let self;


export default class Router {

  constructor(express,
              constants,
              loginController,
              registerController,
              userController) {
    self = this;
    self.constants = constants;
    self.router = new express.Router();

    const path = `${self.constants.V1}`;
    console.log('http://{hostname}' + path);

    self.router.use(`${path}/login`, loginController);
    self.router.use(`${path}/register`, registerController);
    self.router.use(`${path}/users`, userController);

    return self.router;
  }
}