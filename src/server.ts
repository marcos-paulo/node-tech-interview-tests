import "dotenv/config";
import express from "express";
import { router } from "./routes";

const app = express();
app.use(express.json());
app.use(router);

console.log(process.env.PORT);
app.listen(process.env.PORT, () => console.log("Server is running"));
