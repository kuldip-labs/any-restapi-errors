### ES6-based library that effortlessly combines error handling and logging for your RESTful APIs.
### Why It’s a Must-Have
* Simple to use: Just throw a new apiError(404) (or include a custom message), then catch and handle it with built-in logging.
* Automatic Error Logging: Upon catching an error, call error.errorLogger() to create an error.log file containing a comprehensive JSON.
* Ready made consistent response object generated with error.resObj().It can be use to return response in ```res.status(error.statusCode || 500).send(error.resObj());```
* ES6-First & Lightweight: With modern syntax and minimal dependency overhead, it integrates seamlessly into Express/Node.js apps.

### Ideal For...
* Express/Node.js developers seeking consistent, easy-to-maintain error handling.
* Teams striving for better observability—this tool offers immediate insight into what went wrong, complete with diagnostics.
* Anyone building REST APIs who wants to move fast without sacrificing reliability.

### Example 
```javascript
import { apiError } from 'any-restapi-errors';
try {
  if (user === null) {
    /* Handle the case where user is null */
    throw new apiError(404);
    /* or with name as well throw new apiError(404, "User Not Found", true); */
    //params are : new apiError(statusCode,name, isOperational, message, description)
   }
} catch (error) {
  // Log the error using the custom error logger
  error.errorLogger();
  res.status(error.statusCode || 500).send(error.resObj());
  /** or res.status(error.statusCode || 500).send({
    error: {
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
      description:error.description,
      isOperational: error.isOperational
    }
  }); **/
}
```
### Operational Error (not a bug done by programmers) examples
* failed to connect to server
* failed to resolve hostname
* invalid user input
* request timeout
* server returned a 500 response
* socket hang-up
* system is out of memory

### Operational Error Handler
* Quick use ```import  {apiError} from 'any-restapi-errors'; throw new apiError(404);``` : this will throw error object which will have enough detail in error object. You can catch error in catch block. error will have errorLogger method and necessary properties.You can pass any error code ex. 400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,500,501,502,503,504,505,511.
* Detailed use Throw: throw new apiError(statusCode, "Your message")

### Error Logger
* when you use ```error.errorLogger();``` method it will create error.log file and logs details like statusCode, name,  isOperational, message, description,stack,level, timestamp.
* Following Json object example will be created in error.log file when error will occure.

```javascript
{
  statusCode: 404,
  name: 'ApiError',
  message: 'Not Found',
  description: 'The requested page could not be found but may be available again in the future',
  isOperational: true,
  stack: 'ApiError: Not Found\n' +
    '    at new BaseError (file:///D:/projects/any-restapi-errors/apiErrors/baseError.js:10:8)\n' + ...',
  level: 'error',
  timestamp: '2025-08-21 14:16:50'
}
```

### Response Object 
* error.resObj() can be use to return response in ```res.status(error.statusCode || 500).send(error.resObj());```
which will return following error object 
```json
 {
    "error": {
        "name": "ApiError",
        "message": "Not Found",
        "description": "The requested page could not be found but may be available again in the future",
        "statusCode": 404
    }
}
```

## Programatic Errors (bug introduced by programmers)
* Programmer errors almost always → 500 (generic).
* Don’t leak stack traces or sensitive details to the client.
* Handle them with logging + monitoring, not detailed HTTP codes.
### Examples 
* Using an undefined variable
* Accessing properties of null / undefined
* Forgetting await → unhandled Promise rejections
* Infinite loops / recursion → stack overflow
* Wrong type assumptions (e.g., calling .map on a non-array)
* These are bugs in code, not client/server operational issues.

### Exit gracefully if its not operational errors (Programatic errors)
*  These errors can often cause issues in your apps like memory leaks and high CPU usage. The best thing to do is to crash the app and restart it gracefully by using the Node.js cluster mode or a tool like PM2.

```javascript
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  if (!error.isOperational) {
    // log it and exit the process
    process.exit(1);
  }
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // log it, exit the process
  process.exit(1);
})
```



