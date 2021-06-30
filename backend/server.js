import express from "express";
import { config } from "dotenv";

config();

import "./core/db";

const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
