import { config } from "dotenv";
import express from "express";
import passport from "./core/passport";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import authRouter from "./routes/authRouter";

config();

import "./core/db";

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(errorMiddleware);

app.use("/auth", sessionMiddleware, authRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
