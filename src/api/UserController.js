let self;

export default class UserController {
  constructor(express, userService, constants, configErrors) {
    self = this;
    self.expressRouter = new express.Router();
    self.userService = userService;
    self.constants = constants;
    self.configErrors = configErrors;

    self.expressRouter.post('', self.createUser);

    self.expressRouter.get('/:id', self.getUser);

    return self.expressRouter;
  }

  /**
   * @swagger
   *
   * /users:
   *   post:
   *     description: Create a new user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: firstName
   *         description: The user's first name
   *         in: body
   *         required: true
   *         type: string
   *       - name: lastName
   *         description: The user's last name
   *         in: body
   *         required: true
   *         type: string
   *       - name: email
   *         description: The user's email
   *         in: body
   *         required: true
   *         type: string
   *       - name: password
   *         description: The user's password
   *         in: body
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Success
   */
  createUser(req, res, next) {
    self.userService.addUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password)
      .then((result) => {
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

  getUser(req, res, next) {
    self.userService.getUserById(req.params.id)
      .then((result) => {
        res.status(self.constants.SUCCESS).json(result);
      })
      .catch((err) => {
        if(err.status && err.status === self.constants.NOT_FOUND) {
          res.status(self.constants.NOT_FOUND).send({msg: self.configErrors.E0003});
        } else {
          console.error(err);
          res.status(self.constants.INTERNAL_ERROR).send({msg: self.configErrors.E0000});
        }
      });
  }

}