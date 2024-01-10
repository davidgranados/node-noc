import { PrismaClient, SeverityLevel } from "@prisma/client";

import { LogDataSource } from "../../domain/data-sources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
  critical: SeverityLevel.CRITICAL,
};

export class PostgresLogDataSource implements LogDataSource {
  async createLog(log: LogEntity): Promise<void> {
    const newLog = await prismaClient.logModel.create({
      data: {
        message: log.message,
        level: severityEnum[log.level],
        origin: log.origin,
      },
    });
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];
    const logs = await prismaClient.logModel.findMany({
      where: {
        level,
      },
    });

    return logs.map(LogEntity.fromObject);
  }
}
