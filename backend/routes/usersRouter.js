import { Router } from "express";
import passport from "../core/passport";
import usersController from "../controllers/usersController";

const router = Router();

router.get(
  "/adminStatus",
  passport.authenticate("jwt", { session: false }),
  usersController.updateAdminStatus
);

router.get(
  "/accountStatus/:id",
  passport.authenticate("jwt", { session: false }),
  usersController.updateAccountStatus
);

router.get("/", usersController.getUsers);

module.exports = router;
