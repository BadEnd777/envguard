interface EnvConfig {
    [key: string]: string | number | boolean;
}

type GuardType<T> = (value: string) => T;

/**
 * Guards the environment variables based on the provided configuration and returns a proxy object with type-checked values.
 * @param env - The Node.js process environment variables.
 * @param setConfig - The configuration object specifying the expected types for each environment variable.
 * @returns A proxy object with type-checked values.
 * @throws Error if the configuration is empty or if a variable is not defined in the environment.
 * @throws TypeError if a variable is not of the expected type (number, boolean, or string).
 * @throws Error if an unsupported type is specified in the configuration.
 * @example
 * ```ts
 * const env = guardEnv(process.env, {
 *      PORT: Number,
 *      ENABLED: Boolean,
 *      API_KEY: String
 * });
 *
 * console.log(env.PORT); // 3000
 * console.log(env.ENABLED); // true
 * console.log(env.API_KEY); // 'secret
 *
 * console.log(env.NON_EXISTENT); // Error: 'NON_EXISTENT' is not defined in 'guard-env' config
 * ```
 */
export const guardEnv = <T extends string | number | boolean>(
    env: NodeJS.ProcessEnv,
    setConfig: { [key: string]: GuardType<T> }
): EnvConfig => {
    const config: EnvConfig = {};

    if (Object.keys(setConfig).length === 0) {
        throw new Error('Configuration is empty');
    }

    for (const key in setConfig) {
        const value = env[key];

        if (value === undefined) {
            throw new Error(`${key} is not defined in environment variables`);
        }

        const type = setConfig[key].name;

        switch (type) {
            case Number.name:
                if (isNaN(Number(value))) {
                    throw new TypeError(`'${key}' is not of type number`);
                }
                config[key] = setConfig[key](value);
                break;
            case Boolean.name:
                if (value !== Boolean(true).toString() && value !== Boolean(false).toString()) {
                    throw new TypeError(`'${key}' is not of type boolean`);
                }
                config[key] = setConfig[key](value);
                break;
            case String.name:
                config[key] = setConfig[key](value);
                break;
            default:
                throw new Error(`Type '${type}' is not supported`);
        }
    }

    return new Proxy(config, {
        get: (target, prop) => {
            const property = String(prop);
            if (!(property in target)) {
                throw new Error(`'${property}' is not defined in 'guard-env' config`);
            }
            return target[property];
        }
    });
};
