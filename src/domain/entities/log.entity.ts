export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
  critical = "critical",
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogSeverityLevel) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }
}
