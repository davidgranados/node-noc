import { EmailService } from "../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogRepository } from "../repository/log.repository";

interface SendLogsEmailUseCase {
  execute(to: string | string[]): Promise<boolean>;
}

const filename = "/src" + __filename.split("/src").slice(-1)[0];

export class SendLogsEmail implements SendLogsEmailUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly emailService: EmailService
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
      if (!sent) {
        const log = new LogEntity({
          message: `Error sending logs to ${to}`,
          level: LogSeverityLevel.high,
          origin: filename,
        });
        this.logRepository.createLog(log);
        return false;
      }
      const log = new LogEntity({
        message: `Logs sent to ${to}`,
        level: LogSeverityLevel.low,
        origin: filename,
      });
      this.logRepository.createLog(log);
      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `Error sending logs to ${to}`,
        level: LogSeverityLevel.high,
        origin: filename,
      });
      this.logRepository.createLog(log);
      return false;
    }
  }
}
