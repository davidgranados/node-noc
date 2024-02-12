import { LogRepository } from "../../repository/log.repository";
import { CheckServiceMultiple } from "./check-service-multiple";
import { LogEntity } from "../../entities/log.entity";

describe("CheckServiceMultiple use case", () => {
  test("should call successCallback when fetch returns true", async () => {
    // Arrange
    const url = "http://example.com";
    const mockRepository: LogRepository = {
      createLog: jest.fn(),
      getLogs: jest.fn(),
    };
    const mockRepository2: LogRepository = {
      createLog: jest.fn(),
      getLogs: jest.fn(),
    };
    const mockRepository3: LogRepository = {
      createLog: jest.fn(),
      getLogs: jest.fn(),
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    const checkServiceMultiple = new CheckServiceMultiple(
      [mockRepository, mockRepository2, mockRepository3],
      successCallback,
      errorCallback
    );

    // Act
    await checkServiceMultiple.execute(url);

    // Assert
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockRepository.createLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockRepository2.createLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockRepository3.createLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
  test("should call successCallback when fetch returns false", async () => {
    // Arrange
    const url = "http://error.thisdoesnotexist";
    const mockRepository: LogRepository = {
      createLog: jest.fn(),
      getLogs: jest.fn(),
    };
    const mockRepository2: LogRepository = {
      createLog: jest.fn(),
      getLogs: jest.fn(),
    };
    const mockRepository3: LogRepository = {
      createLog: jest.fn(),
      getLogs: jest.fn(),
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    const checkServiceMultiple = new CheckServiceMultiple(
      [mockRepository, mockRepository2, mockRepository3],
      successCallback,
      errorCallback
    );

    // Act
    await checkServiceMultiple.execute(url);

    // Assert
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(mockRepository.createLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockRepository2.createLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockRepository3.createLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
