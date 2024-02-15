import { guardEnv } from '../src/index';

describe('guardEnv', () => {
    beforeEach(() => {
        // Reset environment variables before each test
        process.env = {};
    });

    it('should throw an error if config is empty', () => {
        expect(() => guardEnv(process.env, {})).toThrow('Configuration is empty');
    });

    it('should throw an error if a required environment variable is not defined', () => {
        process.env.SOME_VARIABLE = 'some value';
        const config = {
            REQUIRED_VARIABLE: Number
        };

        expect(() => guardEnv(process.env, config)).toThrow(
            'REQUIRED_VARIABLE is not defined in environment variables'
        );
    });

    it('should throw a TypeError if a variable of type Number is not a valid number', () => {
        process.env.NUMBER_VARIABLE = 'not a number';
        const config = {
            NUMBER_VARIABLE: Number
        };

        expect(() => guardEnv(process.env, config)).toThrow("'NUMBER_VARIABLE' is not of type number");
    });

    it('should throw a TypeError if a variable of type Boolean is not a valid boolean', () => {
        process.env.BOOLEAN_VARIABLE = 'not a boolean';
        const config = {
            BOOLEAN_VARIABLE: Boolean
        };

        expect(() => guardEnv(process.env, config)).toThrow("'BOOLEAN_VARIABLE' is not of type boolean");
    });

    it('should throw an error if a variable of type Date is not a valid date', () => {
        process.env.DATE_VARIABLE = 'not a date';
        const config = {
            DATE_VARIABLE: Date
        };
    
        expect(() => guardEnv(process.env, config)).toThrow("Type 'Date' is not supported");
    });

    it('should return a guarded config object with valid values', () => {
        process.env.NUMBER_VARIABLE = '42';
        process.env.BOOLEAN_VARIABLE = 'true';

        const config = guardEnv(process.env, {
            NUMBER_VARIABLE: Number,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            BOOLEAN_VARIABLE: Boolean
        });

        expect(config.NUMBER_VARIABLE).toBe(42);
        expect(config.BOOLEAN_VARIABLE).toBe(true);
    });

    it('should throw an error when accessing an undefined property in the guarded config', () => {
        process.env.VARIABLE = 'value';

        const config = guardEnv(process.env, {
            VARIABLE: String
        });

        expect(() => config.UNDEFINED_VARIABLE).toThrow("'UNDEFINED_VARIABLE' is not defined in 'guard-env' config");
    });
});
