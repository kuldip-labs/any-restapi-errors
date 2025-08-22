import express from 'express';
import { apiError } from './index.js'; // Assuming api404Error is a custom error handler
const app = express()
const port = 3000

app.get('/error', (req, res) => {
  const error = new Error("An error message")
  console.log(error.message)
  console.log(error.stack)
  console.log(error.name)
  console.log(error.toString())
  res.send(error)
})

app.get('/apiError', (req, res) => {
  // Simulating an error    
  try {
    throw new apiError(404);
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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})