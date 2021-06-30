import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { UserModel } from "../models/userModel";
import generateMD5 from "../utils/generateHash";

class AuthController {
  async signUp(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ status: "error", errors: errors.array() });
        return;
      }

      const data = {
        email: req.body.email,
        username: req.body.username,
        password: generateMD5(req.body.password + process.env.SECRET_KEY),
      };

      const user = await UserModel.create(data);

      res.status(201).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async giveOutJWT(req, res, next) {
    try {
      const user = req.user ? req.user.toJSON() : undefined;

      if (!user.isActive) {
        res.status(409).send();
        return;
      }

      res.json({
        status: "success",
        data: {
          user,
          token: jwt.sign({ data: req.user }, "345", {
            expiresIn: "14 days",
          }),
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
