import fs from "fs";
import path from "path";
import {
  FILE_SYSTEM_LOGS_PATHS,
  FileSystemDataSource,
} from "./file-system.data-source";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe("FileSystemDataSource", () => {
  const rootPath = path.join(__dirname, "../../../");
  const logPath = path.join(rootPath, "/logs");
  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  test("should create log files if they dont exists", () => {
    // Arrange

    // Act
    new FileSystemDataSource();

    // Assert
    expect(fs.existsSync(logPath)).toBe(true);
    expect(fs.existsSync(`${rootPath}/${FILE_SYSTEM_LOGS_PATHS.low}`)).toBe(
      true
    );
    expect(fs.existsSync(`${rootPath}/${FILE_SYSTEM_LOGS_PATHS.medium}`)).toBe(
      true
    );
    expect(fs.existsSync(`${rootPath}/${FILE_SYSTEM_LOGS_PATHS.high}`)).toBe(
      true
    );
    expect(
      fs.existsSync(`${rootPath}/${FILE_SYSTEM_LOGS_PATHS.critical}`)
    ).toBe(true);
  });

  test("should save a log in low logs files", async () => {
    // Arrange
    const dataSource = new FileSystemDataSource();
    const log: LogEntity = {
      level: LogSeverityLevel.low,
      message: "test",
      createdAt: new Date(),
      origin: "test",
    };

    // Act
    await dataSource.createLog(log);

    // Assert
    expect(
      fs.readFileSync(`${rootPath}/${FILE_SYSTEM_LOGS_PATHS.low}`).toString()
    ).toBe(LogEntity.toString(log));
  });

  test("should save a log in medium logs files", async () => {
    // Arrange
    const dataSource = new FileSystemDataSource();
    const log: LogEntity = {
      level: LogSeverityLevel.medium,
      message: "test",
      createdAt: new Date(),
      origin: "test",
    };

    // Act
    await dataSource.createLog(log);

    // Assert
    expect(
      fs.readFileSync(`${rootPath}/${FILE_SYSTEM_LOGS_PATHS.medium}`).toString()
    ).toBe(LogEntity.toString(log));
  });

  test("should save a log in high logs files", async () => {
    // Arrange
    const dataSource = new FileSystemDataSource();
    const log: LogEntity = {
      level: LogSeverityLevel.high,
      message: "test",
      createdAt: new Date(),
      origin: "test",
    };

    // Act
    await dataSource.createLog(log);

    // Assert
    expect(
      fs.readFileSync(`${rootPath}/${FILE_SYSTEM_LOGS_PATHS.high}`).toString()
    ).toBe(LogEntity.toString(log));
  });

  test("should save a log in critical logs files", async () => {
    // Arrange
    const dataSource = new FileSystemDataSource();
    const log: LogEntity = {
      level: LogSeverityLevel.critical,
      message: "test",
      createdAt: new Date(),
      origin: "test",
    };

    // Act
    await dataSource.createLog(log);

    // Assert
    expect(
      fs
        .readFileSync(`${rootPath}/${FILE_SYSTEM_LOGS_PATHS.critical}`)
        .toString()
    ).toBe(LogEntity.toString(log));
  });

  test("should get logs from low logs files", async () => {
    // Arrange
    const dataSource = new FileSystemDataSource();
    const log: LogEntity = {
      level: LogSeverityLevel.low,
      message: "test",
      createdAt: new Date(),
      origin: "test",
    };
    await dataSource.createLog(log);

    // Act
    const logs = await dataSource.getLogs(LogSeverityLevel.low);

    // Assert
    expect(logs).toEqual([log]);
  });

  test("should get logs from medium logs files", async () => {
    // Arrange
    const dataSource = new FileSystemDataSource();
    const log: LogEntity = {
      level: LogSeverityLevel.medium,
      message: "test",
      createdAt: new Date(),
      origin: "test",
    };
    await dataSource.createLog(log);

    // Act
    const logs = await dataSource.getLogs(LogSeverityLevel.medium);

    // Assert
    expect(logs).toEqual([log]);
  });

  test("should get logs from high logs files", async () => {
    // Arrange
    const dataSource = new FileSystemDataSource();
    const log: LogEntity = {
      level: LogSeverityLevel.high,
      message: "test",
      createdAt: new Date(),
      origin: "test",
    };
    await dataSource.createLog(log);

    // Act
    const logs = await dataSource.getLogs(LogSeverityLevel.high);

    // Assert
    expect(logs).toEqual([log]);
  });

  test("should get logs from critical logs files", async () => {
    // Arrange
    const dataSource = new FileSystemDataSource();
    const log: LogEntity = {
      level: LogSeverityLevel.critical,
      message: "test",
      createdAt: new Date(),
      origin: "test",
    };
    await dataSource.createLog(log);

    // Act
    const logs = await dataSource.getLogs(LogSeverityLevel.critical);

    // Assert
    expect(logs).toEqual([log]);
  });

  test("should return empty array if logs file is empty", async () => {
    // Arrange
    const dataSource = new FileSystemDataSource();

    // Act
    const logs = await dataSource.getLogs(LogSeverityLevel.low);

    // Assert
    expect(logs).toEqual([]);
  });
});
