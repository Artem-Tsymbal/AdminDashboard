import express from "express";
import { config } from "dotenv";
import passport from "./core/passport";
import { errorMiddleware } from "./middlewares/errorMiddleware";

config();

import "./core/db";

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
