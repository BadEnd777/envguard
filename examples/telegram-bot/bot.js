const TelegramBot = require('node-telegram-bot-api');
const { guardEnv } = require('guard-env');
require('dotenv').config();

// Guard environment variables
const env = guardEnv(process.env, {
    TELEGRAM_BOT_TOKEN: String
});

// Initialize bot
const bot = new TelegramBot(env.TELEGRAM_BOT_TOKEN, { polling: true });

// Listen for /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to my bot!');
});

// Listen for /echo command
bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const echoMessage = match[1];
    bot.sendMessage(chatId, echoMessage);
});

// Handle errors
bot.on('polling_error', (error) => {
    console.error(error);
});
