import exp from "constants";
import { LogRepository } from "../../repository/log.repository";
import { CheckService } from "./check-service";
import { LogEntity } from "../../entities/log.entity";

describe("CheckService use case", () => {
  test("should call successCallback when fetch returns true", async () => {
    // Arrange
    const url = "http://example.com";
    const mockRepository: LogRepository = {
      createLog: jest.fn(),
      getLogs: jest.fn(),
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    const checkService = new CheckService(
      mockRepository,
      successCallback,
      errorCallback
    );

    // Act
    await checkService.execute(url);

    // Assert
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockRepository.createLog).toHaveBeenCalledWith(
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
    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    const checkService = new CheckService(
      mockRepository,
      successCallback,
      errorCallback
    );

    // Act
    await checkService.execute(url);

    // Assert
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(mockRepository.createLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
