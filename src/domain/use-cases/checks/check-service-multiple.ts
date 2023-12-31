import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { getCurrentFilename } from "../../../utils";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

const filename = getCurrentFilename(__filename);

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback
  ) {}

  private createLogs(log: LogEntity) {
    this.logRepository.forEach((logRepository) => {
      logRepository.createLog(log);
    });
  }

  async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        this.createLogs(
          new LogEntity({
            message: `Error on check service ${url}`,
            level: LogSeverityLevel.high,
            origin: filename,
          })
        );
      }
      this.createLogs(
        new LogEntity({
          message: `Service ${url} is ok`,
          level: LogSeverityLevel.low,
          origin: filename,
        })
      );
      if (this.successCallback) {
        this.successCallback();
      }
      return true;
    } catch (error) {
      this.createLogs(
        new LogEntity({
          message: `Error on check service ${url}`,
          level: LogSeverityLevel.high,
          origin: filename,
        })
      );
      if (this.errorCallback) {
        this.errorCallback(`${error}`);
      }
      return false;
    }
  }
}
