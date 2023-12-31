import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { FileSystemDataSource } from "../infrastructure/data-sources/file-system.data-source";
import { MongoLogDataSource } from "../infrastructure/data-sources/mongo-log.data-source";
import { PostgresLogDataSource } from "../infrastructure/data-sources/postgres-log.data-source";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const psLogRepository = new LogRepositoryImpl(new PostgresLogDataSource());
const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource());

export class Server {
  public static start(): void {
    console.log("Server started");

    CronService.createJob("*/5 * * * * *", () => {
      const url = "http://localhost:3000/";
      new CheckServiceMultiple([
        psLogRepository,
        fsLogRepository,
        mongoLogRepository,
      ]).execute(url);
    });
  }
}
