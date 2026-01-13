import { IsString } from 'class-validator';
import 'reflect-metadata';
import validateConfig from './validate-config';

class EnvVariables {
  @IsString()
  DATABASE_URL: string;
}

describe('validateConfig', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation();
  });

  it('should return validated config for valid input', () => {
    const config = {
      DATABASE_URL: 'localhost',
    };

    const result = validateConfig(config, EnvVariables);

    expect(result).toEqual({
      DATABASE_URL: 'localhost',
    });
  });

  it('should throw an error for missing properties', () => {
    const config = {
      DATABASE_URL: 'localhost',
    };

    expect(() => validateConfig(config, EnvVariables)).toThrow(
      /Error in DATABASE_URL:/,
    );
  });

  it('should throw an error for incorrect types', () => {
    const config = {
      DATABASE_URL: 'localhost',
    };

    expect(() => validateConfig(config, EnvVariables)).toThrow(
      /Error in DATABASE_URL:/,
    );
  });
});
