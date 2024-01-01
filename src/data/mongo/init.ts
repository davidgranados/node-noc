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
}
