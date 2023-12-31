import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugins";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";
import { getCurrentFilename } from "./utils";

const filename = getCurrentFilename(__filename);

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     message: "Hello",
  //     level: "CRITICAL",
  //     origin: filename,
  //   },
  // });

  // console.log(newLog);

  const logs = await prisma.logModel.findMany({
    where: {
      level: "CRITICAL",
    },
  });
  console.log(logs);

  Server.start();
}

(() => {
  main();
})();
