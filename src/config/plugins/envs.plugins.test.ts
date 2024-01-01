import { envs } from "./envs.plugins";

describe("envs.plugin.ts", () => {
  it("shoudl return env options", () => {
    expect(envs).toEqual({
      APP_ENV: "dev",
      MAILER_EMAIL: "7evendevelopers@gmail.com",
      MAILER_SECRET_KEY: "zwnb vrbd jbmq awad",
      MAILER_SERVICE: "gmail",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_PASSWORD: "test",
      MONGO_URL: "mongodb://test:test@localhost:27017/",
      MONGO_USERNAME: "test",
      PORT: 3000,
    });
  });
});
