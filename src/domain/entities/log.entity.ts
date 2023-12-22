export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
  critical = "critical",
}

export interface LogEntityOptions {
  message: string;
  level: LogSeverityLevel;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    this.level = options.level;
    this.message = options.message;
    this.createdAt = options.createdAt || new Date();
    this.origin = options.origin;
  }

  static toString(log: LogEntity): string {
    return `[${log.createdAt.toISOString()}] [${log.level}] ${log.message} [${log.origin}]\n`;
  }

  static getLogMatch(logString: string): RegExpMatchArray | null {
    const logRegex = /^\[(.*)\] \[(.*)\] (.*) \[(.*)\]$/;
    return logString.match(logRegex);
  }

  static fromString(logString: string): LogEntity {
    const logMatch = LogEntity.getLogMatch(logString);
    if (!logMatch) {
      throw new Error("Invalid log string");
    }
    const [, createdAt, level, message, origin] = logMatch;

    return new LogEntity({
      message,
      level: level as LogSeverityLevel,
      createdAt: new Date(createdAt),
      origin,
    });
  }

  static fromJSON(logJSON: string): LogEntity {
    const log = JSON.parse(logJSON);
    return new LogEntity({
      message: log.message,
      level: log.level,
      createdAt: new Date(log.createdAt),
      origin: log.origin,
    });
  }

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    return new LogEntity({
      message: object.message,
      level: object.level,
      createdAt: new Date(object.createdAt),
      origin: object.origin,
    });
  }
}
