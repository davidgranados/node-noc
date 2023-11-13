import * as env from 'env-var'

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  APP_ENV: env.get('APP_ENV').required().asString(),
  MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
  MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
}
