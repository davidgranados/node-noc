import { envs } from "../../config/plugins/envs.plugins";
import { MongoDatabase } from "../../data/mongo";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { MongoLogDataSource } from "./mongo-log.data-source";

describe("Mongo log data source", () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  afterAll(async () => {
    await MongoDatabase.clearDatabase();
    await MongoDatabase.disconnect();
  });

  afterEach(async () => {
    await MongoDatabase.clearDatabase();
  });

  test("should create a log", async () => {
    // Arrange
    const logDataSource = new MongoLogDataSource();

    const log = new LogEntity({
      message: "Test message",
      level: LogSeverityLevel.low,
      createdAt: new Date(),
      origin: "Test origin",
    });

    // Act
    await logDataSource.createLog(log);

    // Assert
    const logs = await logDataSource.getLogs(LogSeverityLevel.low);
    expect(logs.length).toBe(1);
  });

  test("should get logs by level", async () => {
    // Arrange
    const logDataSource = new MongoLogDataSource();

    const log = new LogEntity({
      message: "Test message",
      level: LogSeverityLevel.low,
      createdAt: new Date(),
      origin: "Test origin",
    });

    await logDataSource.createLog(log);

    // Act
    const logs = await logDataSource.getLogs(LogSeverityLevel.low);

    // Assert
    expect(logs.length).toBe(1);
  });
});
