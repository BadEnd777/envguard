# guard-env

Guard-env is a Node.js module for type-checking and guarding environment variables based on specified configurations.

## Installation

You can install guard-env via npm:

```bash
npm install guard-env
```

## Usage

```typescript
import { guardEnv } from 'guard-env';
import 'dotenv/config'; // Don't forget to load environment variables

// Example configuration
const config = {
    PORT: Number,
    ENABLED: Boolean,
    API_KEY: String
};

// Guarding environment variables
const env = guardEnv(process.env, config);

// Accessing type-checked environment variables
console.log(env.PORT); // 3000
console.log(env.ENABLED); // true
console.log(env.API_KEY); // 'secret

// Accessing non-existent variable will throw an error
console.log(env.NON_EXISTENT); // Error: 'NON_EXISTENT' is not defined in 'guard-env' config
```

## API

### guardEnv

Guards the environment variables based on the provided configuration and returns a proxy object with type-checked values.

-   `env`: The Node.js process environment variables.
-   `setConfig`: The configuration object specifying the expected types for each environment variable.

Returns a proxy object with type-checked values.

Throws an Error if:

-   Configuration is empty.

    ```typescript
    const env = guardEnv(process.env, {});

    console.log(env);
    // Error: Configuration is empty
    ```

-   A variable is not defined in the environment.

    ```env
    PORT=3000
    ```

    ```typescript
    const config = {
        PORT: Number,
        ENABLED: Boolean
    };
    const env = guardEnv(process.env, config);

    console.log(env.ENABLED);
    // Error: 'ENABLED' is not defined in 'guard-env' config
    ```

-   An unsupported type is specified in the configuration.
    Throws a TypeError if a variable is not of the expected type (number, boolean, or string).

    ```env
    PORT=THREE_THOUSAND
    ENABLED=ON
    ```

    ```typescript
    const config = {
        PORT: Number,
        ENABLED: Boolean
    };
    const env = guardEnv(process.env, config);

    console.log(env.PORT);
    // TypeError: 'PORT' is not of type number
    console.log(env.ENABLED);
    // TypeError: 'ENABLED' is not of type boolean
    ```

-   An unsupported type is specified in the configuration.

    ```typescript
    const config = {
        DATE: Date
    };
    const env = guardEnv(process.env, config);

    console.log(env.DATE);
    // Error: 'Date' type is not supported
    ```

## Examples

Check out the [examples](examples) directory for more usage examples.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
