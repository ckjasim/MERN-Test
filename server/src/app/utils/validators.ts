import { Request } from 'express';
import { check, ValidationChain } from 'express-validator';

const signupValidator: ValidationChain[] = [
  check('email')
    .isEmail()
    .withMessage('Invalid email format')
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    .withMessage('Invalid email format')
    .notEmpty()
    .withMessage('Email is required'),

  check('mobile')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Must be a valid 10-digit mobile number')
    .notEmpty()
    .withMessage('Mobile number is required'),

  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/)
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .notEmpty()
    .withMessage('Password is required'),

  check('confirmPassword').custom((value, { req }) => {
    if (value !== (req as Request).body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];

const userValidator: ValidationChain[] = [
  // Signup Validations
  check('signup.email')
    .isEmail()
    .withMessage('Invalid email format')
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    .withMessage('Invalid email format')
    .notEmpty()
    .withMessage('Email is required'),

  check('signup.mobile')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Must be a valid 10-digit mobile number')
    .notEmpty()
    .withMessage('Mobile number is required'),

  check('signup.password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/)
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .notEmpty()
    .withMessage('Password is required'),

  check('signup.confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.signup.password) {
        throw new Error('Passwords must match');
      }
      return true;
    })
    .notEmpty()
    .withMessage('Confirm password is required'),

  // Personal Info Validations
  check('personal.title').notEmpty().withMessage('Title is required'),

  check('personal.fullName')
    .matches(/^[a-zA-Z ]*$/)
    .withMessage('Name should only contain letters')
    .notEmpty()
    .withMessage('Full name is required'),

  check('personal.dateOfBirth')
    .isISO8601()
    .withMessage('Invalid date format')
    .custom((value) => {
      if (new Date(value) > new Date()) {
        throw new Error('Date cannot be in the future');
      }
      return true;
    })
    .notEmpty()
    .withMessage('Date of birth is required'),

  check('personal.currentAddress')
    .isLength({ min: 10 })
    .withMessage('Address is too short')
    .notEmpty()
    .withMessage('Current address is required'),

  check('personal.addressDuration')
    .notEmpty()
    .withMessage('Please specify duration'),

  check('personal.aboutYourself')
    .isLength({ min: 20 })
    .withMessage('Please write at least 20 characters')
    .notEmpty()
    .withMessage('Please tell us about yourself'),

  // Financial Info Validations
  check('financial.employmentStatus')
    .notEmpty()
    .withMessage('Employment status is required'),

  check('financial.additionalInvestments').optional().isString(),
];
export { signupValidator, userValidator };
