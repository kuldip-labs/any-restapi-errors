class BaseError extends Error {
 constructor (name,message, statusCode, isOperational, description) {
 super(description)

 Object.setPrototypeOf(this, new.target.prototype)
 this.name = name
 this.message = message
 this.statusCode = statusCode
 this.isOperational = isOperational
 Error.captureStackTrace(this)
 }
}

export default BaseError