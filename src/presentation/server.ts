import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/data-sources/file-system.data-source";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

export class Server {
  public static start(): void {
    console.log("Server started");

    CronService.createJob("*/5 * * * * *", () => {
      const url = "http://localhost:3000/";
      new CheckService(fileSystemLogRepository).execute(url);
    });

    const emailService = new EmailService(fileSystemLogRepository);
    // emailService.sendEmailWithFileSystemLogs(["davidgranados73@gmail.com"]);
  }
}
