import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = () => void;
export type CronServiceJob = CronJob;

export class CronService {
  public static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
    console.log("Cron service started");

    const job = new CronJob(cronTime, onTick);

    job.start();

    return job;
  }

  public static stopJob(job: CronJob): void {
    job.stop();
  }

  public static startJob(job: CronJob): void {
    job.start();
  }

  public static destroyJob(job: CronJob): void {
    job.stop();
  }

  public static restartJob(job: CronJob): void {
    job.stop();
    job.start();
  }

  public static isJobRunning(job: CronJob): boolean {
    return job.running;
  }
}
