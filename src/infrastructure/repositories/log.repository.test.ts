import { LogDataSource } from "../../domain/data-sources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogRepositoryImpl } from "./log.repository.impl";

describe("LogRepository", () => {
  let logRepository: LogRepository;
  let logDataSource: LogDataSource;

  beforeEach(() => {
    jest.clearAllMocks();
    logDataSource = {
      createLog: jest.fn(),
      getLogs: jest.fn(),
    };
    logRepository = new LogRepositoryImpl(logDataSource);
  });

  it("should create a log", async () => {
    const log = new LogEntity({
      message: "test",
      level: LogSeverityLevel.low,
      origin: "test",
    });
    await logRepository.createLog(log);
    expect(logDataSource.createLog).toHaveBeenCalledWith(log);
  });

  it("should get logs", async () => {
    const severityLevel = LogSeverityLevel.low;
    await logRepository.getLogs(severityLevel);
    expect(logDataSource.getLogs).toHaveBeenCalledWith(severityLevel);
  });
});
