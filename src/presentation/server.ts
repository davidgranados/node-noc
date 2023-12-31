import { CheckService } from "../domain/use-cases/checks/check-service";
// import { FileSystemDataSource } from "../infrastructure/data-sources/file-system.data-source";
// import { MongoLogDataSource } from "../infrastructure/data-sources/mongo-log.data-source";
import { PostgresLogDataSource } from "../infrastructure/data-sources/postgres-log.data-source";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const logRepository = new LogRepositoryImpl(
  // new FileSystemDataSource()
  // new MongoLogDataSource()
  new PostgresLogDataSource()
);

export class Server {
  public static start(): void {
    console.log("Server started");

    CronService.createJob("*/5 * * * * *", () => {
      const url = "http://localhost:3000/";
      new CheckService(logRepository).execute(url);
    });
  }
}
