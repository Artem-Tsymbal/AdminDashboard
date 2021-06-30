import { validationResult } from "express-validator";
import { UserModel } from "../models/userModel";

class UsersController {
  async getUsers(_req, res, next) {
    try {
      const users = await UserModel.find({}).exec();

      res.json({
        status: "success",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateAdminStatus(req, res) {
    try {
      const { _id, isAdmin } = req.user;

      if (_id) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          res.status(400).json({ status: "error", errors: errors.array() });
        }

        UserModel.findByIdAndUpdate(
          _id,
          { isAdmin: !isAdmin },
          { new: true },
          (error, user) => {
            if (error) res.send(error);

            res.status(201).json({
              status: "success",
              data: user,
            });
          }
        );
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  async updateAccountStatus(req, res) {
    try {
      const userId = req.params.id;
      const { isAdmin } = req.user;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ status: "error", errors: errors.array() });
      }

      const user = await UserModel.findById(userId).exec();

      if (user) {
        if (!isAdmin && user.isActive === false) {
          res.status(403).send();
          return;
        }
        user.isActive = !user.isActive;
        user.save();

        res.status(201).json({
          status: "success",
          data: user,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
}

export default new UsersController();
