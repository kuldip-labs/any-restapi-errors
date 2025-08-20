### any-restapi-errors is es6 based rest API error handling and logging
### How do you use it? 
#### Throw it in your code when you want to  handle and log any errors 

```import  {apiError} from 'any-restapi-errors';
  try {
    if (user === null) {
throw new apiError(404); 
// or with name as well throw new apiError(404,"details");
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

### Error Logger

### error logger
* when you use ```error.errorLogger();``` method it will create error.log file and logs details like isOperational, level, message, service,stack.
* Following Json object example will be created in error.log file when error will occure.

```{"isOperational":true,"level":"error","message":"Not found.","service":"user-service","stack":"Error: Not found.\n    at new BaseError (file:///D:/npm-error/baseError.js:11:8)\n ,"statusCode":404}```