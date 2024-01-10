import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDataSource } from "./log.datasource";

describe("log.datasource.test.ts", () => {
  const newLog = new LogEntity({
    origin: "log.datasource.test.ts",
    message: "message",
    level: LogSeverityLevel.low,
  });

  class MockLogDataSource implements LogDataSource {
    createLog(log: LogEntity): Promise<void> {
      return Promise.resolve();
    }
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return Promise.resolve([newLog]);
    }
  }

  it("should text the abstract class", async () => {
    const logDataSource = new MockLogDataSource();

    expect(logDataSource).toHaveProperty("createLog");
    expect(logDataSource).toHaveProperty("getLogs");
    expect(typeof logDataSource.createLog).toBe("function");
    expect(typeof logDataSource.getLogs).toBe("function");
  });
});
