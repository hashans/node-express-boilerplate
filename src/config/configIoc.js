import {createContainer, InjectionMode, asValue, asClass} from 'awilix';
import * as constants from '../utils/constants';
import config from './configuration';
import mongoose from 'mongoose';
import express from 'express';
import router from '../api/router';

let container = createContainer({
    injectionMode: InjectionMode.CLASSIC
});

mongoose.Promise = global.Promise;
mongoose.connect(config.db.mongodb.connectionStr,{ useNewUrlParser: true });


import LoginController from '../api/LoginController'

console.log("Registering dependencies...");
container.register({
    config: asValue(config),
    constants: asValue(constants),
    express: asValue(express),
    mongoose: asValue(mongoose),
    router: asClass(router).singleton(),


    //controllers
    loginController: asClass(LoginController).singleton()
});

export default container;