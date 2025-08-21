### ES6-based library that effortlessly combines error handling and logging for your RESTful APIs.
### Why It’s a Must-Have
* Simple to use: Just throw a new apiError(404) (or include a custom message), then catch and handle it with built-in logging.
* Automatic Error Logging: Upon catching an error, call error.errorLogger() to create an error.log file containing a comprehensive JSON.
* ES6-First & Lightweight: With modern syntax and minimal dependency overhead, it integrates seamlessly into Express/Node.js apps.

### Ideal For...
* Express/Node.js developers seeking consistent, easy-to-maintain error handling.
* Teams striving for better observability—this tool offers immediate insight into what went wrong, complete with diagnostics.
* Anyone building REST APIs who wants to move fast without sacrificing reliability.

### Example 
```import  {apiError} from 'any-restapi-errors';
  try {
    if (user === null) {
throw new apiError(404); 
// or with name as well throw new apiError(404,"User not found");
}
  } catch (error) {
    // Log the error using the custom error logger
    error.errorLogger();
    res.status(error.statusCode || 500).send({
      error: {
        name: error.name,
        message: error.message,
        statusCode: error.statusCode,
        isOperational: error.isOperational
      }
    });
  }
```
### Error Handler
* Quick use ```import  {apiError} from 'any-restapi-errors'; throw new apiError(404);``` : this will throw error object which will have enough detail in error object. You can catch error in catch block. error will have errorLogger method and necessary properties.You can pass any error code ex. 400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,500,501,502,503,504,505,511.
* Detailed use Throw: throw new apiError(statusCode, "Your message")


### Error Logger
* when you use ```error.errorLogger();``` method it will create error.log file and logs details like statusCode, name,  isOperational, message, description,stack,level, timestamp.
* Following Json object example will be created in error.log file when error will occure.

```{
  statusCode: 404,
  name: 'ApiError',
  message: 'Not Found',
  description: 'The requested page could not be found but may be available again in the future',
  isOperational: true,
  stack: 'ApiError: Not Found\n' +
    '    at new BaseError (file:///D:/projects/any-restapi-errors/apiErrors/baseError.js:10:8)\n' +
    '    at new ApiError (file:///D:/projects/any-restapi-errors/apiErrors/apiError.js:12:2)\n' +
    '    at file:///D:/projects/any-restapi-errors/test-server.js:13:11\n' +
    '    at Layer.handleRequest (D:\\projects\\any-restapi-errors\\node_modules\\router\\lib\\layer.js:152:17)\n' +
    '    at next (D:\\projects\\any-restapi-errors\\node_modules\\router\\lib\\route.js:157:13)\n' +
    '    at Route.dispatch (D:\\projects\\any-restapi-errors\\node_modules\\router\\lib\\route.js:117:3)\n' +
    '    at handle (D:\\projects\\any-restapi-errors\\node_modules\\router\\index.js:435:11)\n' +
    '    at Layer.handleRequest (D:\\projects\\any-restapi-errors\\node_modules\\router\\lib\\layer.js:152:17)\n' +
    '    at D:\\projects\\any-restapi-errors\\node_modules\\router\\index.js:295:15\n' +
    '    at processParams (D:\\projects\\any-restapi-errors\\node_modules\\router\\index.js:582:12)',
  level: 'error',
  timestamp: '2025-08-21 14:16:50'
}```