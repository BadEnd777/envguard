// Import the Client class
const { Client } = require('chat-bridge');
const { guardEnv } = require('guard-env');
require('dotenv').config();

// Guard environment variables
const env = guardEnv(process.env, {
    ACCESS_TOKEN: String,
    VERIFY_TOKEN: String
});

// Create a new client instance
const client = new Client({
    accessToken: env.ACCESS_TOKEN,
    verifyToken: env.VERIFY_TOKEN
});

// Listen for incoming messages events
client.on('message', (event) => {
    const { sender, message } = event;

    // Send a text message back to the sender
    client.sendTextMessage(sender.id, `You wrote: ${message.text}`);
});

// Start the client
client.start(async () => {
    console.log(`Listening on ${client.page.name} (${client.page.id})`);
});
