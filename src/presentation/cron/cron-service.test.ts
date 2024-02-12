import { CronService, CronServiceJob } from "./cron-service";

describe("CronService", () => {
  let job: CronServiceJob | undefined = undefined;

  afterEach(() => {
    jest.clearAllMocks();
    if (job) {
      CronService.destroyJob(job);
      job = undefined;
    }
  });

  test("should create a job", () => {
    // Arrange
    const cronTime = "0 0 * * *";
    const onTick = jest.fn();
    // Act
    job = CronService.createJob(cronTime, onTick);
    // Assert
    expect(job).toBeDefined();
  });

  test("should start a job", () => {
    // Arrange
    const cronTime = "0 0 * * *";
    const onTick = jest.fn();
    // Act
    job = CronService.createJob(cronTime, onTick);
    // Assert
    expect(CronService.isJobRunning(job)).toBe(true);
  });
});
