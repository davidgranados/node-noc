import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { getCurrentFilename } from "../../../utils";

interface CheckServiceUseCae {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

const filename = getCurrentFilename(__filename);

export class CheckService implements CheckServiceUseCae {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        this.logRepository.createLog(
          new LogEntity({
            message: `Error on check service ${url}`,
            level: LogSeverityLevel.high,
            origin: filename,
          })
        );
      }
      this.logRepository.createLog(
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
      this.logRepository.createLog(
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
