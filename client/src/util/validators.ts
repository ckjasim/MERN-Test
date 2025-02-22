import * as Yup from 'yup';

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')  
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      'Invalid email format'
    )
    .required('Email is required'),
  mobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Must be a valid 10-digit mobile number')
    .required('Mobile number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm password is required'),
});

export const personalInfoSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  fullName: Yup.string()
    .matches(/^[a-zA-Z ]*$/, 'Name should only contain letters')
    .required('Full name is required'),
  dateOfBirth: Yup.date()
    .max(new Date(), 'Date cannot be in the future')
    .required('Date of birth is required'),
  currentAddress: Yup.string()
    .min(10, 'Address is too short')
    .required('Current address is required'),
  addressDuration: Yup.string()
    .required('Please specify duration'),
  aboutYourself: Yup.string()
    .min(20, 'Please write at least 20 characters')
    .required('Please tell us about yourself'),
});

export const financialInfoSchema = Yup.object().shape({
  employmentStatus: Yup.string()
    .required('Employment status is required'),
  additionalInvestments: Yup.string()
    .nullable(),
});

