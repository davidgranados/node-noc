import nodemailer from 'nodemailer';

import { envs } from '../../config/plugins/envs.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

const filename = "/src" + __filename.split("/src").slice(-1)[0];

interface attachments {
  filename: string;
  path: string;
}

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: attachments[];
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor(private readonly logRepository: LogRepository) {}

  async sendEmail(options: SendMailOptions) {
    const mailOptions = {
      from: envs.MAILER_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.htmlBody,
      attachments: options.attachments || [],
    };

    try {
      await this.transporter.sendMail(mailOptions);
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Email sent to ${options.to}`,
        origin: filename,
      });
      this.logRepository.createLog(log);
      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `Error sending email to ${options.to}`,
        origin: filename,
      });
      this.logRepository.createLog(log);
      return false;
    }
  }

  sendEmailWithFileSystemLogs(to: SendMailOptions["to"]) {
    const mailOptions = {
      from: envs.MAILER_EMAIL,
      to: to,
      subject: "Logs",
      htmlBody: "Logs",
      attachments: [
        {
          filename: "logs.txt",
          path: "./logs/logs-high.log",
        },
      ],
    };

    this.sendEmail(mailOptions);
  }

}
