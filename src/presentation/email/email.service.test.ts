import nodemailer from "nodemailer";

import { EmailService } from "./email.service";

describe("EmailService", () => {
  const sendMailMock = jest.fn();

  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: sendMailMock,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should send an email", async () => {
    // Arrange
    const emailService = new EmailService();
    const options = {
      to: "example@example.com",
      subject: "Test",
      htmlBody: "<p>Test</p>",
    };
    // Act
    const result = await emailService.sendEmail(options);
    // Assert
    expect(result).toBe(true);
    expect(sendMailMock).toHaveBeenCalled();
  });

  test("should send an email with attachments", async () => {
    // Arrange
    const emailService = new EmailService();
    const options = {
      to: "example@example.com",
      subject: "Test",
      htmlBody: "<p>Test</p>",
      attachments: [
        {
          filename: "file.txt",
          path: "./file.txt",
        },
      ],
    };
    // Act
    const result = await emailService.sendEmail(options);
    // Assert
    expect(result).toBe(true);
    expect(sendMailMock).toHaveBeenCalled();
  });
});
