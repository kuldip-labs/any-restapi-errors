class BaseError extends Error {
 constructor (name, message, description, isOperational = true) {
 super(description)

 Object.setPrototypeOf(this, new.target.prototype)
 this.name = name
 this.message = message
this.description = description
 this.isOperational = isOperational
 Error.captureStackTrace(this)
 }
}

export default BaseError