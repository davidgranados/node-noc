import { MongoDatabase } from "./init";

describe("init.test.ts", () => {
  it("should connect to mongo db", async () => {
    const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
    const MONGO_URL = process.env.MONGO_URL;

    if (!MONGO_DB_NAME || !MONGO_URL) {
      throw new Error("MONGO_DB_NAME or MONGO_URL is not defined");
    }

    const connected = await MongoDatabase.connect({
      dbName: MONGO_DB_NAME,
      mongoUrl: MONGO_URL,
    });

    expect(connected).toBe(true);
  });
});
