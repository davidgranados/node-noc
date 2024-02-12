import { EmailService } from "../../presentation/email/email.service";
import { LogEntity } from "../entities/log.entity";
import { LogRepository } from "../repository/log.repository";
import { SendLogsEmail } from "./send-logs";

describe("SendLogs use case", () => {
  const mockRepository: LogRepository = {
    createLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
    sendEmail: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call sendEmailWithFileSystemLogs and createLog", async () => {
    // Arrange
    const sendLogs = new SendLogsEmail(mockRepository, mockEmailService as any);
    const to = "example@example.com";

    // Act
    const result = await sendLogs.execute(to);

    // Assert
    expect(result).toBe(true);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(
      to
    );
    expect(mockRepository.createLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
  test("should log in case of error", async () => {
    // Arrange
    mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);
    const sendLogs = new SendLogsEmail(mockRepository, mockEmailService as any);
    const to = "example@example.com";

    // Act
    const result = await sendLogs.execute(to);

    // Assert
    expect(result).toBe(false);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(
      to
    );
    expect(mockRepository.createLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
