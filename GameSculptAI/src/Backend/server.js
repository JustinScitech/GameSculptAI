import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
//  This is the backend to handle the API calls for the image generation

dotenv.config();

// Create an instance of express to serve your app
const app = express();

// Use bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Enable cors for all requests
app.use(cors());



// Define a route handler for GET requests to the root URL '/'
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define a route handler for POST requests to '/post'
app.post('/post', (req, res) => {
  console.log(req.body); // Log the request body to the console
  res.status(200).send('POST request received');
});



// Start the server on the specified port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
