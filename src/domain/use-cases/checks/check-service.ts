import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCae {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

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
          new LogEntity(`Error on check service ${url}`, LogSeverityLevel.high)
        );
      }
      this.logRepository.createLog(
        new LogEntity(`Service ${url} is ok`, LogSeverityLevel.low)
      );
      if (this.successCallback) {
        this.successCallback();
      }
      return true;
    } catch (error) {
      this.logRepository.createLog(
        new LogEntity(`Error on check service ${url}`, LogSeverityLevel.high)
      );
      if (this.errorCallback) {
        this.errorCallback(`${error}`);
      }
      return false;
    }
  }
}
