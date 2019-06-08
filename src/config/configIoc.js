import {createContainer, InjectionMode, asValue, asClass} from 'awilix';
import * as constants from '../utils/constants';
import configErrors from './configErrors';
import config from './configuration';
import mongoose from 'mongoose';
import express from 'express';
import passport from 'passport';
import passportJwt from 'passport-jwt';
import jwt from 'jsonwebtoken';
import q from 'q';
import router from '../api/router';
import moment from 'moment';
import bcrypt from 'bcryptjs';

import UserService from '../services/UserService';

import UserRepository from '../repository/mongodb/UserRepository';

let container = createContainer({
    injectionMode: InjectionMode.CLASSIC
});

mongoose.Promise = require('q').Promise;
mongoose.connect(config.db.mongodb.connectionStr,{ useNewUrlParser: true });


import LoginController from '../api/LoginController';
import RegisterController from '../api/RegisterController';

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
    moment: asValue(moment),
    router: asClass(router).singleton(),
    userService: asClass(UserService).singleton(),
    userRepository: asClass(UserRepository).singleton(),


    //controllers
    loginController: asClass(LoginController).singleton(),
    registerController: asClass(RegisterController).singleton()
});

export default container;