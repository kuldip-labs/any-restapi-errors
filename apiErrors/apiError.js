import statusCodes from './statusCodes.json' with { type: 'json' };
import BaseError from './baseError.js'
import logger from '../winston.js'
class ApiError extends BaseError {
 constructor (
statusCode,
name,
 isOperational = true,
 message,
 description,

 ) {
 super(name, message, description, isOperational)
    this.statusCode = statusCode;
    this.name = name || 'ApiError';
    this.isOperational = isOperational; 
    this.message = statusCodes[`${statusCode}`].message || 'ApiError';
    this.description = statusCodes[`${statusCode}`].description || 'An error occurred';
 }
  errorLogger = function() {
      logger.error({
        statusCode: this.statusCode,
        name: this.name,
        message: this.message,
        description: this.description,
        isOperational: this.isOperational,       
        stack: this.stack
    })
}
    resObj = function() {
    return {
        error: {
            name: this.name,
            message: this.message,
            description: this.description,
            statusCode: this.statusCode
                }
    } 
}  
 isOperationalError = function(error) {
 if (error instanceof ApiError) {
 return error.isOperational
 }
 return false
}                                                                                                  
}

export default ApiError