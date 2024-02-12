import fs from "fs";

import { LogDataSource } from "../../domain/data-sources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export const FILE_SYSTEM_LOGS_PATHS = {
  root: "logs/",
  low: "logs/logs-low.log",
  medium: "logs/logs-medium.log",
  high: "logs/logs-high.log",
  critical: "logs/logs-critical.log",
};

export class FileSystemDataSource implements LogDataSource {
  private readonly logsPath = FILE_SYSTEM_LOGS_PATHS.root;
  private readonly lowLogsPath = FILE_SYSTEM_LOGS_PATHS.low;
  private readonly mediumLogsPath = FILE_SYSTEM_LOGS_PATHS.medium;
  private readonly highLogsPath = FILE_SYSTEM_LOGS_PATHS.high;
  private readonly criticalLogsPath = FILE_SYSTEM_LOGS_PATHS.critical;

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles(): void {
    // Create logs directory
    if (!fs.existsSync(this.logsPath)) {
      fs.mkdirSync(this.logsPath);
    }
    // Create logs files
    [
      this.lowLogsPath,
      this.mediumLogsPath,
      this.highLogsPath,
      this.criticalLogsPath,
    ].forEach((path) => {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, "");
      }
    });
  }

  private getLogPath(level: LogSeverityLevel): string {
    switch (level) {
      case LogSeverityLevel.low:
        return this.lowLogsPath;
      case LogSeverityLevel.medium:
        return this.mediumLogsPath;
      case LogSeverityLevel.high:
        return this.highLogsPath;
      case LogSeverityLevel.critical:
        return this.criticalLogsPath;
    }
  }

  private getLogMessage(log: LogEntity): string {
    return LogEntity.toString(log);
  }

  createLog(log: LogEntity): Promise<void> {
    const logPath = this.getLogPath(log.level);
    const logMessage = this.getLogMessage(log);
    return new Promise((resolve, reject) => {
      fs.appendFile(logPath, logMessage, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  private getLogsFromFile(path: string): Promise<LogEntity[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          reject(err);
        }
        const logs = data
          .toString()
          .split("\n")
          .filter((log) => log !== "" && LogEntity.getLogMatch(log) !== null)
          .map((log) => {
            return LogEntity.fromString(log);
          });
        resolve(logs);
      });
    });
  }

  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.lowLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);
      case LogSeverityLevel.critical:
        return this.getLogsFromFile(this.criticalLogsPath);
      default:
        throw new Error("Invalid severity level: " + severityLevel);
    }
  }
}
