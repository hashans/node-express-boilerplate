// Library imports
import { createContainer, InjectionMode, asValue, asClass } from 'awilix';
import mongoose from 'mongoose';
import express from 'express';
import passport from 'passport';
import passportJwt from 'passport-jwt';
import jwt from 'jsonwebtoken';
import q from 'q';
import router from '../api/router';
import moment from 'moment';
import bcrypt from 'bcryptjs';
import swaggerJSDoc from 'swagger-jsdoc';

// Utility and config imports
import * as constants from '../utils/constants';
import configErrors from './configErrors';
import config from './configuration';

// Service imports
import UserService from '../services/UserService';

// Repository imports
import UserRepository from '../repository/mongodb/UserRepository';

// Controller imports
import LoginController from '../api/LoginController';
import RegisterController from '../api/RegisterController';
import UserController from '../api/UserController';

let container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

mongoose.Promise = require('q').Promise;
mongoose.connect(config.db.mongodb.connectionStr,{ useNewUrlParser: true });

console.log("Initializing Swagger API documentation...");
let swaggerDefinition = {
  info: {
    title: 'RESTful web services for NodeJS Express boilerplate',
    version: '1.0.0',
    description: 'Documentation for NodeJS Express boilerplate',
  },
  host: 'localhost:3001',
  basePath: '/v1/',
  schemes: ['http'],
  consumes: ["application/json"],
  produces: ["application/json"]
};
let options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['dist/api/**/*.js']
};
let swaggerSpec = swaggerJSDoc(options);

console.log("Registering dependencies...");
container.register({
  config: asValue(config),
  constants: asValue(constants),
  configErrors: asValue(configErrors),
  express: asValue(express),
  mongoose: asValue(mongoose),
  passport: asValue(passport),
  passportJwt: asValue(passportJwt),
  jwt: asValue(jwt),
  bcrypt: asValue(bcrypt),
  q: asValue(q),
  swaggerSpec: asValue(swaggerSpec),
  moment: asValue(moment),
  router: asClass(router).singleton(),

  // Service injection
  userService: asClass(UserService).singleton(),

  // Repository injection
  userRepository: asClass(UserRepository).singleton(),

  // Controller injection
  loginController: asClass(LoginController).singleton(),
  registerController: asClass(RegisterController).singleton(),
  userController: asClass(UserController).singleton()
});

export default container;