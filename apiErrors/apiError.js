import statusCodes from './statusCodes.json' with { type: 'json' };
import BaseError from './baseError.js'
import logger from '../winston.js'

class ApiError extends BaseError {
 constructor (
statusCode,
name,
 message = statusCodes[statusCode].message || 'ApiError', 
 description = statusCodes[statusCode].description || 'An error occurred',
 isOperational = true,
 ) {
 super(name, message, statusCode, isOperational, description)
 }
  errorLogger = function() {
      logger.error({
        statusCode: this.statusCode,
        name: this.name,
        isOperational: this.isOperational,
        message: this.message,
        description: this.description,
        stack: this.stack
    })
}
}

export default ApiError