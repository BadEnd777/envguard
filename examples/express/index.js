const { guardEnv } = require('guard-env');
const express = require('express');
require('dotenv').config(); // Load environment variables from .env file

// Guarding environment variables
const env = guardEnv(process.env, {
    PORT: Number
});

// Create an express app
const app = express();

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
});
