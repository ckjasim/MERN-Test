import { Request } from "express";
import { check, ValidationChain } from "express-validator";

const signupValidator: ValidationChain[] = [
  check('email')
    .isEmail()
    .withMessage('Invalid email format'),

  check('mobile')
    .isMobilePhone('any')
    .withMessage('Invalid mobile number'),

  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number'),
    

  check('confirmPassword')
    .custom((value, { req }) => {
      if (value !== (req as Request).body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];
export { signupValidator  };