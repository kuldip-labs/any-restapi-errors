import express from 'express';
import process from "node:process";
import { apiError } from '../index.js'; // Assuming api404Error is a custom error handler
const app = express()
const port = 3000
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  console.log(error.isOperational)
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
app.get('/error', (req, res) => {
  const error = new Error("An error message")
  console.log(error.message)
  console.log(error.stack)
  console.log(error.name)
  console.log(error.toString())
  res.send(error)
})

app.get('/apiError', (req, res) => {
 
   try {
   throw new apiError(404, "caught error with try catch block", true);
  } catch (error) {
    console.error(error.description);
    // Log the error using the custom error logger
    error.errorLogger();
    if (!error.isOperationalError(error)) {
      process.exit(1)
    }
    res.status(error.statusCode || 500).send(error.resObj());
  }

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})