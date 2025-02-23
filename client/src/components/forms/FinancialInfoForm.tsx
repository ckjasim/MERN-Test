import { Formik, Form, Field, FieldProps } from 'formik';
import { FormLayout } from './components/FormLayout';
import { financialInfoSchema } from '../../util/validators';
import { FormData } from '@/redux/features/auth/type';

interface FinancialInfoFormProps {
  onSubmit: (values: FormData['financial']) => void;
}
export const FinancialInfoForm: React.FC<FinancialInfoFormProps> = ({
  onSubmit,
}) => {
  return (
    <FormLayout
      title="Financial information"
      subtitle="All your information is stored securely."
    >
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
            <div className="relative">
              <Field name="employmentStatus">
                {({ field }: FieldProps) => (
                  <div className="relative">
                    <select
                      {...field}
                      className={`peer w-full px-3 py-2 border rounded-lg focus:ring-0 outline-none transition-colors bg-white appearance-none
                        ${
                          errors.employmentStatus && touched.employmentStatus
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:border-blue-500'
                        }
                      `}
                    >
                      <option value="">Select status</option>
                      <option value="employed">Employed</option>
                      <option value="self-employed">Self-employed</option>
                      <option value="unemployed">Unemployed</option>
                      <option value="student">Student</option>
                      <option value="retired">Retired</option>
                    </select>
                    <label
                      className={`absolute left-3 -top-2.5 bg-white px-1 text-sm transition-all
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                        peer-focus:-top-2.5 peer-focus:text-sm
                        ${
                          errors.employmentStatus && touched.employmentStatus
                            ? 'text-red-500'
                            : 'text-gray-500'
                        }
                        pointer-events-none
                      `}
                    >
                      What is your current employment status?
                    </label>
                  </div>
                )}
              </Field>
              {errors.employmentStatus && touched.employmentStatus && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.employmentStatus}
                </div>
              )}
            </div>

            <div className="relative">
              <Field name="additionalInvestments">
                {({ field }: FieldProps) => (
                  <div className="relative">
                    <input
                      {...field}
                      type="text"
                      placeholder=" "
                      className={`peer w-full px-3 py-2 border rounded-lg focus:ring-0 outline-none transition-colors bg-white
                        ${
                          errors.additionalInvestments &&
                          touched.additionalInvestments
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:border-blue-500'
                        }
                      `}
                    />
                    <label
                      className={`absolute left-3 -top-2.5 bg-white px-1 text-sm transition-all
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                        peer-focus:-top-2.5 peer-focus:text-sm
                        ${
                          errors.additionalInvestments &&
                          touched.additionalInvestments
                            ? 'text-red-500'
                            : 'text-gray-500'
                        }
                        pointer-events-none
                      `}
                    >
                      Additional savings/investments
                    </label>
                  </div>
                )}
              </Field>
              {errors.additionalInvestments &&
                touched.additionalInvestments && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.additionalInvestments}
                  </div>
                )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors ${
                isSubmitting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-blue-600'
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
