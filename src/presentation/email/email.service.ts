import nodemailer from 'nodemailer';

import { envs } from '../../config/plugins/envs.plugins';

interface SendMailOptions {
  to: string;
  subject: string;
  htmlBody: string;
  // TODO: attachments?: {}
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
    };

    try {
      const sentInfo = await this.transporter.sendMail(mailOptions);
      console.log(sentInfo);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}
