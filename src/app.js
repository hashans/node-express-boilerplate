import express from 'express';
import bodyParser from 'body-parser';
import * as constants from './utils/constants';
import cors from 'cors';

let app = express();

// Use middleware as required
app.use(bodyParser.json({ limit: constants.REQUEST_LIMIT_KB + "kb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Base router
app.get('/', function (req, res, next) {
    res.json({msg: 'Hello World!'});
});

// catch 404 and forward to error handler
app.use( (req, res, next) => {
    let err = new Error('Not Found');
    err.status = constants.NOT_FOUND;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.status(err.status || constants.INTERNAL_ERROR);
    res.json({
        code: err.name,
        error: err.message
    });
    return next();
});

export default app;