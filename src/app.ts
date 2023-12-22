import { envs } from "./config/plugins/envs.plugins";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";
import { getCurrentFilename } from "./utils";

const filename = getCurrentFilename(__filename);

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  // const newLog = await LogModel.create({
  //   level: "low",
  //   message: "This is a test",
  //   origin: filename,
  // });

  // await newLog.save();

  const logs = await LogModel.find({});

  console.log(logs);

  Server.start();
}

(() => {
  main();
})();
