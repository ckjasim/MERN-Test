import { SignupForm } from '../../components/forms/SignupForm';
import { FinancialInfoForm } from '../../components/forms/FinancialInfoForm';
import { PersonalInfoForm } from '../../components/forms/PersonalInfoForm';
import { useDispatch, useSelector } from 'react-redux';
import { SetCurrentStep, SetSubmitting, UpdateFormData } from '../../redux/features/auth/authSlice';
import { RootState } from '../../redux/store';
import { createUserApi, userSignupApi } from '../../services/api/authApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const SignupPage = () => {
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const { currentStep, formData } = useSelector((state: RootState) => state.Auth);

  const handleSubmit = async (values, formType) => {
    try {
      dispatch(SetSubmitting(true));

      const updatedFormData = { ...formData, [formType]: values };
      dispatch(UpdateFormData({ formType, data: values }));

      if (formType === 'signup') {
        try {
          await userSignupApi(values); 
        } catch (error:any) {
          toast.error(error.response.data.errors[0]);
          return;
        }
      }

      if (currentStep < 3) {
        dispatch(SetCurrentStep(currentStep + 1)); 
      } else {
        console.log('Final submission:', updatedFormData);
        const res =  await createUserApi(updatedFormData);
        console.log('User created:', res);  
        toast.success('signup done successfully');
        if (res?.data?.id) {
          navigate(`/saved-form/${res?.data?.id}`);
        }
      }
    } catch (error:any) {
      console.error('Form submission error:', error);
      toast.error(error.response.data.errors[0]);

    } finally {
      dispatch(SetSubmitting(false));
    }
  };

  const renderForm = () => {
    const forms = [
      <SignupForm onSubmit={(values) => handleSubmit(values, 'signup')} />,
      <PersonalInfoForm onSubmit={(values) => handleSubmit(values, 'personal')} />,
      <FinancialInfoForm onSubmit={(values) => handleSubmit(values, 'financial')} />,
    ];
    return forms[currentStep - 1] || null;
  };

  return renderForm();
};
