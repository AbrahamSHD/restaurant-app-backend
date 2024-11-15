import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DB_NAME: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  DEFAULT_ROLE_ID: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DB_NAME: joi.string().required(),
    POSTGRES_USER: joi.string().required(),
    POSTGRES_PASSWORD: joi.string().required(),
    DATABASE_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    DEFAULT_ROLE_ID: joi.string().uuid().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation Error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  dbName: envVars.DB_NAME,
  postgresUser: envVars.POSTGRES_USER,
  postgresPassword: envVars.POSTGRES_PASSWORD,
  databaseUrl: envVars.DATABASE_URL,
  jwtSecret: envVars.JWT_SECRET,
  defaultRoleId: envVars.DEFAULT_ROLE_ID,
};
