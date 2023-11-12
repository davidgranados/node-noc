import fs from "fs";

import { LogDataSource } from "../../domain/data-sources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDataSource {
  private readonly logsPath = "logs/";
  private readonly lowLogsPath = "logs/logs-low.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";
  private readonly criticalLogsPath = "logs/logs-critical.log";

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
    return `[${log.createdAt.toISOString()}] [${log.level}] ${log.message}\n`;
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
  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }
}
