import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { userSignupApi } from '../../services/api/authApi';

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string().trim()
    .min(2, 'Please enter a valid name')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[^\w]/, 'Password must contain at least one symbol')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const renderPasswordStrength = (password: string) => {
    if (!password) return null;
    
    const strength = {
      length: password.length >= 8,
      number: /[0-9]/.test(password),
      lower: /[a-z]/.test(password),
      upper: /[A-Z]/.test(password),
      symbol: /[^\w]/.test(password),
    };

    const getStrengthClass = (isValid: boolean) => 
      isValid ? 'bg-green-500' : 'bg-gray-200';

    return (
      <div className="mt-2 space-y-2">
        <p className="text-sm font-medium text-gray-700">Password strength:</p>
        <div className="flex gap-1">
          {Object.values(strength).map((isValid, index) => (
            <div 
              key={index}
              className={`h-1 w-full rounded ${getStrengthClass(isValid)}`}
            />
          ))}
        </div>
      </div>
    );
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      // Prepare the data
      const data = {
        fullName: values.fullName,
        email: values.email,
        password: values.password
      };

      // Call your signup API
      const response = await userSignupApi(data);
      console.log(response)
      
      // Show success toast
    
      
      // Navigate to OTP page
      // navigate('/auth/otp');
    } catch (error: any) {
      // Show error toast
      // toast({
      //   title: "Sign Up Failed",
      //   description: error.response?.data?.message || 'An error occurred during sign-up.',
      //   variant: "destructive",
      // });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-gray-600">Join our community and start your journey</p>
        </div>

        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, isSubmitting }) => (
            <Form className="space-y-6">
              {/* Full Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Field
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  className={`w-full px-4 py-2 border rounded-lg outline-none transition-colors
                    ${errors.fullName && touched.fullName 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-blue-500'}`}
                />
                {errors.fullName && touched.fullName && (
                  <div className="text-red-500 text-sm mt-1">{errors.fullName}</div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className={`w-full px-4 py-2 border rounded-lg outline-none transition-colors
                    ${errors.email && touched.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-blue-500'}`}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className={`w-full px-4 py-2 border rounded-lg outline-none transition-colors
                      ${errors.password && touched.password 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {renderPasswordStrength(values.password)}
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    className={`w-full px-4 py-2 border rounded-lg outline-none transition-colors
                      ${errors.confirmPassword && touched.confirmPassword 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors
                  ${isSubmitting 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'}`}
              >
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;