import React from 'react';
import { Formik, Form, Field } from 'formik';
import { FormLayout } from './components/FormLayout';
import { StepIndicator } from './components/StepIndicator';
import { HelpCircle } from 'lucide-react';
import { personalInfoSchema } from '../../util/validators';

export const PersonalInfoForm = ({ onSubmit }) => {
  return (
    <FormLayout
      title="Personal information"
      subtitle="Please answer questions as accurately as possible."
    >
      <Formik
        initialValues={{
          title: 'mr',
          fullName: '',
          dateOfBirth: '',
          currentAddress: '',
          addressDuration: '',
          aboutYourself: '',
        }}
        validationSchema={personalInfoSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Field name="title">
                  {({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        className={`peer w-full px-3 py-2 border rounded-lg focus:ring-0 outline-none transition-colors bg-white appearance-none
                          ${errors.title && touched.title 
                            ? 'border-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:border-blue-500'
                          }
                        `}
                      >
                        <option value="mr">Mr.</option>
                        <option value="mrs">Mrs.</option>
                        <option value="ms">Ms.</option>
                        <option value="dr">Dr.</option>
                      </select>
                      <label
                        className={`absolute left-3 -top-2.5 bg-white px-1 text-sm transition-all
                          peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                          peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500
                          ${errors.title && touched.title ? 'text-red-500 peer-focus:text-red-500' : 'text-gray-500'}
                          pointer-events-none
                        `}
                      >
                        Title
                      </label>
                    </div>
                  )}
                </Field>
                {errors.title && touched.title && (
                  <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                )}
              </div>

              <div className="relative md:col-span-3">
                <Field name="fullName">
                  {({ field }) => (
                    <div className="relative">
                      <input
                        {...field}
                        type="text"
                        placeholder=" "
                        className={`peer w-full px-3 py-2 border rounded-lg focus:ring-0 outline-none transition-colors bg-white
                          ${errors.fullName && touched.fullName 
                            ? 'border-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:border-blue-500'
                          }
                        `}
                      />
                      <label
                        className={`absolute left-3 -top-2.5 bg-white px-1 text-sm transition-all
                          peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                          peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500
                          ${errors.fullName && touched.fullName ? 'text-red-500 peer-focus:text-red-500' : 'text-gray-500'}
                          pointer-events-none
                        `}
                      >
                        Full Name as per your passport
                      </label>
                    </div>
                  )}
                </Field>
                {errors.fullName && touched.fullName && (
                  <div className="text-red-500 text-sm mt-1">{errors.fullName}</div>
                )}
              </div>
            </div>

            <div className="relative">
              <Field name="dateOfBirth">
                {({ field }) => (
                  <div className="relative">
                    <input
                      {...field}
                      type="date"
                      placeholder=" "
                      className={`peer w-full px-3 py-2 border rounded-lg focus:ring-0 outline-none transition-colors bg-white
                        ${errors.dateOfBirth && touched.dateOfBirth 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-blue-500'
                        }
                      `}
                    />
                    <label
                      className={`absolute left-3 -top-2.5 bg-white px-1 text-sm transition-all
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                        peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500
                        ${errors.dateOfBirth && touched.dateOfBirth ? 'text-red-500 peer-focus:text-red-500' : 'text-gray-500'}
                        pointer-events-none
                      `}
                    >
                      Date of Birth
                    </label>
                  </div>
                )}
              </Field>
              {errors.dateOfBirth && touched.dateOfBirth && (
                <div className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</div>
              )}
            </div>

            <div className="relative">
              <Field name="currentAddress">
                {({ field }) => (
                  <div className="relative">
                    <input
                      {...field}
                      type="text"
                      placeholder=" "
                      className={`peer w-full px-3 py-2 border rounded-lg focus:ring-0 outline-none transition-colors bg-white
                        ${errors.currentAddress && touched.currentAddress 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-blue-500'
                        }
                      `}
                    />
                    <label
                      className={`absolute left-3 -top-2.5 bg-white px-1 text-sm transition-all
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                        peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500
                        ${errors.currentAddress && touched.currentAddress ? 'text-red-500 peer-focus:text-red-500' : 'text-gray-500'}
                        pointer-events-none
                      `}
                    >
                      Current address
                    </label>
                  </div>
                )}
              </Field>
              {errors.currentAddress && touched.currentAddress && (
                <div className="text-red-500 text-sm mt-1">{errors.currentAddress}</div>
              )}
            </div>

            <div className="relative">
              <Field name="addressDuration">
                {({ field }) => (
                  <div className="relative">
                    <input
                      {...field}
                      type="text"
                      placeholder=" "
                      className={`peer w-full px-3 py-2 border rounded-lg focus:ring-0 outline-none transition-colors bg-white
                        ${errors.addressDuration && touched.addressDuration 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-blue-500'
                        }
                      `}
                    />
                    <label
                      className={`absolute left-3 -top-2.5 bg-white px-1 text-sm transition-all
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                        peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500
                        ${errors.addressDuration && touched.addressDuration ? 'text-red-500 peer-focus:text-red-500' : 'text-gray-500'}
                        pointer-events-none
                      `}
                    >
                      How long have you lived at this address?
                    </label>
                  </div>
                )}
              </Field>
              {errors.addressDuration && touched.addressDuration && (
                <div className="text-red-500 text-sm mt-1">{errors.addressDuration}</div>
              )}
            </div>

            <div className="relative">
              <Field name="aboutYourself">
                {({ field }) => (
                  <div className="relative">
                    <textarea
                      {...field}
                      placeholder=" "
                      className={`peer w-full px-3 py-2 border rounded-lg focus:ring-0 outline-none transition-colors bg-white h-32
                        ${errors.aboutYourself && touched.aboutYourself 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-blue-500'
                        }
                      `}
                    />
                    <label
                      className={`absolute left-3 -top-2.5 bg-white px-1 text-sm transition-all
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                        peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500
                        ${errors.aboutYourself && touched.aboutYourself ? 'text-red-500 peer-focus:text-red-500' : 'text-gray-500'}
                        pointer-events-none
                      `}
                    >
                      Tell us a bit about yourself
                    </label>
                  </div>
                )}
              </Field>
              {errors.aboutYourself && touched.aboutYourself && (
                <div className="text-red-500 text-sm mt-1">{errors.aboutYourself}</div>
              )}
            </div>

            <div className="text-sm text-gray-500 flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span>All information can be edited once you have created your account.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-500 text-sm text-white py-3 px-4 rounded-lg transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Save and continue'}
            </button>
          </Form>
        )}
      </Formik>
    </FormLayout>
  );
};