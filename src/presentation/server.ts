import { CronService } from "./cron/cron-service";

export class Server {
  public static start(): void {
    console.log("Server started");

    CronService.createJob("*/2 * * * * *", () => {
      console.log("Cron job executed" + new Date());
    });
  }
}
