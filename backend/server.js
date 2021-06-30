import express from "express";
import { config } from "dotenv";
import passport from "./core/passport";

config();

import "./core/db";

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
