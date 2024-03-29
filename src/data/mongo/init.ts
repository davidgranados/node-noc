import mongoose from "mongoose";

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions): Promise<boolean> {
    const { mongoUrl, dbName } = options;
    await mongoose.connect(mongoUrl, {
      dbName,
    });
    return true;
  }

  static async disconnect(): Promise<boolean> {
    await mongoose.disconnect();
    return true;
  }

  static async clearDatabase(): Promise<boolean> {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
    return true;
  }
}
