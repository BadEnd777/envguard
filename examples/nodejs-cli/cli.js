// cli.js
const { Command } = require('commander');
const { guardEnv } = require('guard-env');
require('dotenv').config(); // Load environment variables from .env file

// Guarding environment variables
const env = guardEnv(process.env, {
    PORT: Number,
    DATABASE_URL: String
});

const program = new Command();

program
    .option('-p, --port <port>', 'Set the port number')
    .option('-d, --database <url>', 'Set the database URL')
    .parse(process.argv);

const { port: cliPort, database: cliDatabase } = program.opts();

// Load configuration settings
const defaultPort = env.PORT;
const defaultDatabase = env.DATABASE_URL;

// Use command-line arguments if provided, otherwise use configuration settings
const port = cliPort || defaultPort;
const database = cliDatabase || defaultDatabase;

console.log(`Using port: ${port}`);
console.log(`Using database: ${database}`);
