import { CheckService } from "../domain/use-cases/checks/check-service";
// import { SendLogsEmail } from "../domain/use-cases/send-logs";
import { FileSystemDataSource } from "../infrastructure/data-sources/file-system.data-source";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
// import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);
// const emailService = new EmailService();

export class Server {
  public static start(): void {
    console.log("Server started");

    CronService.createJob("*/5 * * * * *", () => {
      const url = "http://localhost:3000/";
      new CheckService(fileSystemLogRepository).execute(url);
    });

    // new SendLogsEmail(fileSystemLogRepository, emailService).execute(
    //   ["davidgranados73@gmail.com"]
    // );
  }
}
