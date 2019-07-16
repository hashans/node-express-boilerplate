# node-express-boilerplate

Base code for bootstrapping a node.js + express.js project

![nodejs](https://nodeblog.files.wordpress.com/2011/07/nodejs.png) ![expressjs](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)
![mongodb](https://zdnet3.cbsistatic.com/hub/i/r/2017/10/19/58167892-60ef-4eec-a43a-3e5cda4a7ea5/resize/370xauto/44143a11635e1f75ab8ec36318aaa16d/mongo-db-logo.png) ![q](http://kriskowal.github.io/q/q.png)
![babel](http://www.programwitherik.com/content/images/2015/07/babel.png)

This project uses the following technology:

| Function | Package |
| -------- | ------- |
| Package management | npm |
| ES transpilation | babel  |
| Dependency injection | Awilix |
| Promises | q |
| MongoDB connection | mongoose |

* _To build_ : `npm install`
* _To run_ : `MONGODB=<mongodb_connection_url> npm start`

#### Swagger documentation

Swagger documentation is managed through the `swagger-jsdoc` library.
Swagger specification uses the OpenAPI 2.0 standard.
An example for documentation attached to controller functions can be found in `UserController`.

#### Dependency Injection

Dependency injection is managed in `config/configIoc.js`. Dependencies are imported and injected in to the `awilix` container.
Dependencies can then be injected in to classes via the `constructor` function. For more information, see [the Awilix NPM page](https://www.npmjs.com/package/awilix).