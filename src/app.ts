import "reflect-metadata";
import "express-async-errors";
import "./database";
import server from "./server";

console.clear();
server.listen(process.env.PORT, () =>
  console.info(`[SERVER]`, `Running at http://localhost:${process.env.PORT}`)
);
