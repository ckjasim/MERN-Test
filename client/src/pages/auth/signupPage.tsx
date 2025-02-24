import { SignupForm } from '../../components/forms/SignupForm';
import { FinancialInfoForm } from '../../components/forms/FinancialInfoForm';
import { PersonalInfoForm } from '../../components/forms/PersonalInfoForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  SetCurrentStep,
  SetSubmitting,
  UpdateFormData,
} from '../../redux/features/auth/authSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { createUserApi, userSignupApi } from '../../services/api/authApi';
import { useNavigate } from 'react-router-dom';
import { FormData } from '@/redux/features/auth/type';
import { showToast } from '@/util/toast/Toast';

export const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { currentStep, formData } = useSelector(
    (state: RootState) => state.Auth
  );

  const handleSubmit = async <K extends keyof FormData>(
    values: FormData[K],
    formType: K
  ): Promise<void> => {
    try {
      dispatch(SetSubmitting(true));

      const updatedFormData: FormData = { ...formData, [formType]: values };
      dispatch(UpdateFormData({ formType, data: values }));

      if (formType === 'signup') {
        try {
          await userSignupApi(values);
        } catch (error: any) {
          showToast.error(error.response?.data?.errors?.[0] || 'An error occurred')
          return;
        }
      }

      if (currentStep < 3) {
        dispatch(SetCurrentStep(currentStep + 1));
      } else {
        
        const res = await createUserApi(updatedFormData);
        showToast.success('Signup done successfully');

        if (res?.data?.id) {
          navigate(`/saved-form/${res.data.id}`);
        }
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      showToast.error(error.response?.data?.errors?.[0] || 'An error occurred');
    } finally {
      dispatch(SetSubmitting(false));
    }
  };

  const renderForm = (): JSX.Element | null => {
    const forms: JSX.Element[] = [
      <SignupForm
        onSubmit={(values: FormData['signup']) =>
          handleSubmit(values, 'signup')
        }
      />,
      <PersonalInfoForm
        onSubmit={(values: FormData['personal']) =>
          handleSubmit(values, 'personal')
        }
      />,
      <FinancialInfoForm
        onSubmit={(values: FormData['financial']) =>
          handleSubmit(values, 'financial')
        }
      />,
    ];
    return forms[currentStep - 1] || null;
  };

  return renderForm();
};
