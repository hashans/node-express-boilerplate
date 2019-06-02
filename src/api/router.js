let self;


export default class Router {

    constructor(express, constants, loginController) {
        self = this;
        self.constants = constants;
        self.router = new express.Router();

        const path = `${self.constants.V1}`;
        console.log('http://{hostname}' + path);

        self.router.use(`${path}/login`,loginController);

        return self.router;
    }
}