import statusCodes from './statusCodes.json' with { type: 'json' };
import BaseError from './baseError.js'
import logger from '../winston.js'
class ApiError extends BaseError {
 constructor (
statusCode,
name,
 message,
 description,
 isOperational = true,
 ) {
 super(name, message, description, isOperational)
    this.statusCode = statusCode;
    this.name = name || 'ApiError';
    this.message = statusCodes[`${statusCode}`].message || 'ApiError';
    this.description = statusCodes[`${statusCode}`].description || 'An error occurred';
    this.isOperational = isOperational; 
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
}

export default ApiError