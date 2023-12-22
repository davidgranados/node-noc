import * as env from 'env-var'

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  APP_ENV: env.get('APP_ENV').required().asString(),
  MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
  MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
  MONGO_URL: env.get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
  MONGO_USERNAME: env.get('MONGO_USERNAME').required().asString(),
  MONGO_PASSWORD: env.get('MONGO_PASSWORD').required().asString(),
}
