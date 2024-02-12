import nodemailer from 'nodemailer';

import { envs } from '../../config/plugins/envs.plugins';

interface Attachments {
  filename: string;
  path: string;
}

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[];
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendMailOptions) {
    const mailOptions = {
      from: envs.MAILER_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.htmlBody,
      attachments: options.attachments ?? [],
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: SendMailOptions["to"]) {
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

    return await this.sendEmail(mailOptions);
  }

}
