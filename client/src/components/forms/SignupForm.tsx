import { Formik, Form, Field } from 'formik';
import { Eye, EyeOff, HelpCircle } from 'lucide-react';

import { FormLayout } from './components/FormLayout';
import React, { useState } from 'react';
import { signupSchema } from './schemas/validationSchema';

export const SignupForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const getPasswordStrength = (password) => {
    if (!password) return '';
    const checks = {
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
    }; 
    const strength = Object.values(checks).filter(Boolean).length;
    return strength;
  };


  return (
    <FormLayout
      title="Create your account"
      subtitle="Set-up your RentlyPass in as little as 2 minutes."
    >
      <Formik
        initialValues={{
          email: '',
          mobile: '',   
          password: '',
          confirmPassword: '',
        }}
        validationSchema={signupSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting ,values }) => (
            <Form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact details
              </label>
              <div className="space-y-4">
                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                  )}
                </div>
                <div className="relative">
                  <Field
                    name="mobile"
                    type="tel"
                    placeholder="Mobile number"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <HelpCircle className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
                  {errors.mobile && touched.mobile && (
                    <div className="text-red-500 text-sm mt-1">{errors.mobile}</div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Set a password
              </label>
              <div className="space-y-4">
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  {values.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((index) => (
                          <div
                            key={index}
                            className={`h-1 flex-1 rounded-full ${
                              index <= getPasswordStrength(values.password)
                                ? 'bg-green-500'
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-gray-500">
                        Password must contain:
                        <ul className="mt-1">
                          <li className={values.password.length >= 6 ? 'text-green-500' : ''}>
                            • At least 6 characters
                          </li>
                          <li className={/[A-Z]/.test(values.password) ? 'text-green-500' : ''}>
                            • One uppercase letter
                          </li>
                          <li className={/[a-z]/.test(values.password) ? 'text-green-500' : ''}>
                            • One lowercase letter
                          </li>
                          <li className={/\d/.test(values.password) ? 'text-green-500' : ''}>
                            • One number
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                  )}
                </div>
                <div className="relative">
                  <Field
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
                  )}
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              We need a password to keep your information safe. But don't worry, we'll also send your custom RentlyPass URL via email.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              {isSubmitting ? 'Creating account...' : 'Create your account'}
            </button>

            <p className="text-sm text-gray-500 text-center">
              By clicking 'Create your account', you are agreeing to our{' '}
              <a href="#" className="text-gray-700 underline">Terms & Conditions</a>
              {' '}and{' '}
              <a href="#" className="text-gray-700 underline">Privacy Policy</a>
            </p>
          </Form>
        )}
      </Formik>
    </FormLayout>
  );
};