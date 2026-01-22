// import process = require("process");

import mongoose from "mongoose";

import app from "./app";
import config from "./app/config";
import { Server } from "http";
// for unhandled rejection error handle
// let server: Server;
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    // for unhandled rejection error handle server =
    //server =
    server = app.listen(config.port, () => {
      console.log(`Example app is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

//unhandledRejection error handle
//"unhandledRejection" এটা Node.js-এর built-in event।
process.on("unhandledRejection", () => {
  console.log(`unhandled rejection is detected shutting down the server`);
  // polite vabe server off
  // jodi server e kaj cholte thake
  if (server) {
    server.close(() => {
      // server sathe sathe close na kore politely close korar callback function
      process.exit(1);
    });
  }
  process.exit(1);
});
//uncaught exception error handle
process.on("uncaughtException", () => {
  console.log(`uncaught exception is detected`);
  process.exit(1);
});
// jehetu eita sync function tai evabe check kortesi error
// console.log(x);
