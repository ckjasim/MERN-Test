import { Formik, Form, Field } from 'formik';

import { FormLayout } from './components/FormLayout';
import { StepIndicator } from './components/StepIndicator';
import { HelpCircle } from 'lucide-react';
import { personalInfoSchema } from './schemas/validationSchema';

export const PersonalInfoForm = ({ onSubmit }) => {
  return (
    <FormLayout
      title="Personal information"
      subtitle="Please answer questions as accurately as possible."
    >
      <StepIndicator currentStep={1} totalSteps={2} />
      <Formik
        initialValues={{
          title: '',
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
              <div>
                <Field
                  as="select"
                  name="title"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Mr.</option>
                  <option value="mr">Mr.</option>
                  <option value="mrs">Mrs.</option>
                  <option value="ms">Ms.</option>
                  <option value="dr">Dr.</option>
                </Field>
                {errors.title && touched.title && (
                  <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                )}
              </div>
              <div className="md:col-span-3">
                <Field
                  name="fullName"
                  type="text"
                  placeholder="Full Name as per your passport"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.fullName && touched.fullName && (
                  <div className="text-red-500 text-sm mt-1">{errors.fullName}</div>
                )}
              </div>
            </div>

            <div>
              <Field
                name="dateOfBirth"
                type="date"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.dateOfBirth && touched.dateOfBirth && (
                <div className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</div>
              )}
            </div>

            <div>
              <Field
                name="currentAddress"
                type="text"
                placeholder="Current address"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.currentAddress && touched.currentAddress && (
                <div className="text-red-500 text-sm mt-1">{errors.currentAddress}</div>
              )}
            </div>

            <div>
              <Field
                name="addressDuration"
                type="text"
                placeholder="How long have you lived at this address?"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.addressDuration && touched.addressDuration && (
                <div className="text-red-500 text-sm mt-1">{errors.addressDuration}</div>
              )}
            </div>

            <div>
              <Field
                as="textarea"
                name="aboutYourself"
                placeholder="Tell us a bit about yourself (what are you like as a person, do you have any hobbies, etc.)"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
              />
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
              className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors ${
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