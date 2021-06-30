import { body } from "express-validator";

const registrationValidation = [
  body("email", "Enter E-Mail")
    .isEmail()
    .withMessage("Wrong E-Mail")
    .isLength({
      min: 10,
      max: 40,
    })
    .withMessage("Min length 10 max 40."),
  body("username", "Enter username")
    .isString()
    .isLength({
      min: 2,
      max: 40,
    })
    .withMessage("Min 2 max 40."),
  body("password", "Enter password")
    .isString()
    .isLength({
      min: 6,
    })
    .withMessage("​Min length 6")
    .custom((value, { req }) => {
      if (value !== req.body.password2) {
        throw new Error("Passwords are not equal");
      } else {
        return value;
      }
    }),
];

export default registrationValidation;
