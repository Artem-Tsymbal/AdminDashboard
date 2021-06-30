import { Router } from "express";
import passport from "../core/passport";
import authController from "../controllers/authController";
import registrationValidation from "../validations/sign-up";

const router = Router();

router.post("/sign-up", registrationValidation, authController.signUp);

router.post(
  "/sign-in",
  passport.authenticate("local"),
  authController.giveOutJWT
);

router.get(
  "/refresh",
  passport.authenticate("jwt", { session: false }),
  authController.giveOutJWT
);

module.exports = router;
