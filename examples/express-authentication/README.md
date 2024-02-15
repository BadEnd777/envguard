# Express Authentication Example

This is a simple Express.js web application demonstrating user authentication using a token-based approach. The application utilizes the `guard-env` package to securely manage environment variables such as the port number and secret key.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/BadEnd777/guard-env.git
cd guard-env/examples/express-authentication
```

1. Install dependencies:

```bash
npm install # or your preferred package manager
```

3. Create a `.env` file in the root directory and define the following variables:

```
PORT=3000
SECRET_KEY=mysecretkey
```

## Usage

-   **Start the server**:

To start the server, run the following command:

```bash
npm start
```

The server will start running on `http://localhost:3000` by default. You can change the port number by modifying the `PORT` variable in the `.env` file.

-   **Development Mode**:

To run the server in development mode, use the following command:

```bash
npm run dev
```

This will start the server using `nodemon`, which automatically restarts the server when changes are detected in the source code.

## Routes

### GET /

Displays a welcome message.

Example Request:

```bash
curl -X GET http://localhost:3000/
```

Example Response:

```plaintext
Welcome to the Express Authentication example
```

### POST /login

Endpoint for user authentication. It expects a JSON object containing `username` and `password` in the request body. If the credentials are valid, it returns a token.

Example Request:

```bash
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username": "user1", "password": "password1"}'
```

Example Response:

```json
{
    "token": "mysecretkey"
}
```

### GET /user

Displays user information after successful authentication. Requires a valid token in the Authorization header.

Example Request:

```bash
curl -X GET http://localhost:3000/user -H "Authorization: Bearer mysecretkey"
```

Example Response:

```json
{
    "user": {
        "id": 1,
        "username": "user1",
        "password": "password1",
        "email": "user1@example.com"
    }
}
```

### GET /error

Throws an error demonstrating how `guard-env` handles undefined environment variables.

Example Request:

```bash
curl -X GET http://localhost:3000/error
```

Example Response:

```json
{
    "error": "'INVALID_VARIABLE' is not defined in 'guard-env' config"
}
```

## Testing

To test the routes, you can use tools like `curl` or Postman. Ensure to provide the necessary inputs as mentioned in the route descriptions.

## Note

In a real-world scenario, you would implement more robust authentication mechanisms such as JWT (JSON Web Tokens) for generating tokens and database integration for user management. This example provides a basic illustration of user authentication with Express.js.
