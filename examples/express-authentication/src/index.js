const { guardEnv } = require('guard-env');
const express = require('express');
require('dotenv').config();

// Configuration for guard-env
const config = {
    PORT: Number,
    SECRET_KEY: String
};

// Guarding environment variables
const env = guardEnv(process.env, config);

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mock user data
const users = [
    { id: 1, username: 'user1', password: 'password1', email: 'user1@example.com' },
    { id: 2, username: 'user2', password: 'password2', email: 'user2@example.com' }
];

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
    // Check if Authorization header is present
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    // Check if token is valid
    const token = authHeader.split(' ')[1];
    if (token !== env.SECRET_KEY) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    // In a real application, you would fetch user information from the database
    // For demonstration purposes, we'll just return a mock user object
    req.user = users[0];
    next();
};

// Route to display welcome message
app.get('/', (req, res) => {
    res.send('Welcome to the Express Authentication example');
});

// Route to handle user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find((user) => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate and return a token (in a real application, use JWT for token generation)
    const token = env.SECRET_KEY;
    res.json({ token });
});

// Route to display user information after login
app.get('/user', authenticateUser, (req, res) => {
    // In a real application, you would fetch user information from the database
    // For demonstration purposes, we'll just return a mock user object
    res.json({ user: req.user });
});

// Route to throw an error
app.get('/error', (req, res) => {
    try {
        const INVALID_VARIABLE = env.INVALID_VARIABLE;
        res.json({ INVALID_VARIABLE });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(env.PORT, () => {
    console.log(`Server is running on http://localhost:${env.PORT}`);
});
