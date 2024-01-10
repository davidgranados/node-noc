import { LogEntity, LogSeverityLevel } from "./log.entity";

describe("log.entity.test.ts", () => {
  const logData = {
    origin: "log.entity.test.ts",
    message: "message",
    level: LogSeverityLevel.low,
  };

  it("should create LogEntity instance", () => {
    const newLog = new LogEntity(logData);

    expect(newLog).toBeInstanceOf(LogEntity);
    expect(newLog).toEqual(expect.objectContaining(logData));

    expect(newLog.createdAt).toBeInstanceOf(Date);
  });

  it("should create LogEntity instance from string", () => {
    const logString =
      "[2023-12-18T13:17:55.010Z] [low] Service http://localhost:3000/ is ok [/src/domain/use-cases/checks/check-service.ts]";

    const newLog = LogEntity.fromString(logString);

    expect(newLog).toBeInstanceOf(LogEntity);
    expect(newLog).toEqual(
      expect.objectContaining({
        origin: "/src/domain/use-cases/checks/check-service.ts",
        message: "Service http://localhost:3000/ is ok",
        level: LogSeverityLevel.low,
      })
    );
  });

  it("should create LogEntity instance from object", () => {
    const logObject = logData;

    const newLog = LogEntity.fromObject(logObject);

    expect(newLog).toBeInstanceOf(LogEntity);
    expect(newLog).toEqual(expect.objectContaining(logObject));
  });
});
