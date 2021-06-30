import { body } from "express-validator";

const userUpdateValidation = [
  body("status", "It should be boolean").isBoolean(),
];

export default userUpdateValidation;
