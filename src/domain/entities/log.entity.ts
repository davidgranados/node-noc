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

  constructor(message: string, level: LogSeverityLevel, createdAt?: Date) {
    this.message = message;
    this.level = level;
    this.createdAt = createdAt || new Date();
  }

  static toString(log: LogEntity): string {
    return `[${log.createdAt.toISOString()}] [${log.level}] ${log.message}\n`;
  }

  static getLogMatch(logString: string): RegExpMatchArray | null {
    const logRegex = /\[(.*)\] \[(.*)\] (.*)/;
    return logString.match(logRegex);
  }

  static fromString(logString: string): LogEntity {
    const logMatch = LogEntity.getLogMatch(logString);
    if (!logMatch) {
      throw new Error("Invalid log string");
    }
    const [, createdAt, level, message] = logMatch;
    return new LogEntity(message, level as LogSeverityLevel, new Date(createdAt));
  }
}
