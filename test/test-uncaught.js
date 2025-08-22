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
  setTimeout(() => {
  throw new apiError(500, "uncaught error without try catch block",false);
}, 1000);
 
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})