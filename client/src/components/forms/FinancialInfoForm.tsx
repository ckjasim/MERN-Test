import { Formik, Form, Field } from 'formik';
import { FormLayout } from './components/FormLayout';
import { StepIndicator } from './components/StepIndicator';
import { financialInfoSchema } from '../../util/validators';

export const FinancialInfoForm = ({ onSubmit }) => {
  return (
    <FormLayout
      title="Financial information"
      subtitle="All your information is stored securely."
    >
      <StepIndicator currentStep={2} totalSteps={2} />
      <Formik
        initialValues={{
          employmentStatus: '',
          additionalInvestments: '',
        }}
        validationSchema={financialInfoSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <Field
                as="select"
                name="employmentStatus"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">What is your current employment status?</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="student">Student</option>
                <option value="retired">Retired</option>
              </Field>
              {errors.employmentStatus && touched.employmentStatus && (
                <div className="text-red-500 text-sm mt-1">{errors.employmentStatus}</div>
              )}
            </div>

            <div>
              <Field
                name="additionalInvestments"
                type="text"
                placeholder="Additional savings/investments"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.additionalInvestments && touched.additionalInvestments && (
                <div className="text-red-500 text-sm mt-1">{errors.additionalInvestments}</div>
              )}
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