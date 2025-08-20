import  express from 'express';
import  {apiError} from './index.js'; // Assuming api404Error is a custom error handler
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/error', (req, res) => {   
  // Simulating an error    
  try {
    throw new apiError(404);
  } catch (error) {
    console.error(error);
    // Log the error using the custom error logger
    error.errorLogger();
    res.status(error.statusCode || 500).send({
      error: {
        name: error.name,
        message: error.message,
        description: error.description,
        statusCode: error.statusCode,
        isOperational: error.isOperational
      }
    });
  }
  
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})