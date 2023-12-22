import mongoose from "mongoose";

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions): Promise<void> {
    const { mongoUrl, dbName } = options;
    await mongoose.connect(mongoUrl, {
      dbName
    });
    console.log("MongoDB connected")
  }
}
