import { envs } from "../../../config/plugins/envs.plugins";
import { getCurrentFilename } from "../../../utils";
import { MongoDatabase } from "../init";
import { LogModel } from "./log.model";

const filename = getCurrentFilename(__filename);

describe("log.model.test.ts", () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });

  afterAll(async () => {
    await MongoDatabase.disconnect();
  });

  it("should return LogModel", async () => {
    const logData = {
      origin: filename,
      message: "test",
      level: "low",
    };

    const log = await LogModel.create(logData);

    expect(log).toBeInstanceOf(LogModel);

    await LogModel.findByIdAndDelete(log.id);
  });

  it("should return the schema object", () => {
    const schema = LogModel.schema.obj;

    expect(schema).toEqual(
      expect.objectContaining({
        level: {
          type: expect.any(Function),
          required: expect.any(Boolean),
          enum: ["low", "medium", "high", "critical"],
          default: "low",
        },
        message: { type: expect.any(Function), required: expect.any(Boolean) },
        origin: { type: expect.any(Function) },
        createdAt: expect.any(Object),
      })
    );
  });

  it("", () => {});
});
