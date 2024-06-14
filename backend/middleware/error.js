const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // MongoDB Cast error
    if (err.name === "CastError") {
        const message = `Resource not Found. Invalid ${err.path}`;
        err = new ErrorHandler(400, message);
        next(err);
    }

    // duplicate email register error
    if(err.code === 11000){
        const message = `Duplicate email entered`;
        err = new ErrorHandler(400, message);
        next(err);
    }   

    // wrong json web token
    if(err.name === JsonWebTokenError){
        const message = `Invalid JWT Token, Try Again !!`;
        err = new ErrorHandler(400, message);
        next(err);
    }

    // JWT Tokenk Expire
    if(err.name === TokenExpiredError){
        const message = `Expired JWT Token, Try Again !!`;
        err = new ErrorHandler(400, message);
        next(err);
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.message,
        trace: err.trace,
        path: new Error(err).stack,
    })
};