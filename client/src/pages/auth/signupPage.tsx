import React from 'react';

import { SignupForm } from '../../components/forms/SignupForm';
import { FinancialInfoForm } from '../../components/forms/FinancialInfoForm';
import { PersonalInfoForm } from '../../components/forms/PersonalInfoForm';
import { useDispatch, useSelector } from 'react-redux';
import { SetCurrentStep, SetSubmitting, UpdateFormData } from '../../redux/features/auth/authSlice';
import { RootState } from '../../redux/store';
import { userSignupApi } from '../../services/api/authApi';
export const SignupPage = () => {
  const dispatch = useDispatch();
  const { currentStep, formData, isSubmitting} = useSelector((state:RootState)=>state.Auth)
  const [step, setStep] = React.useState(1);

  const handleSubmit = async (values, formType) => {
    try {

      if(formType === 'signup'){  
        const res = await userSignupApi(values)
        console.log(res)  
      }
      dispatch(SetSubmitting(true));
      dispatch(UpdateFormData({ formType, data: values }));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (currentStep < 3) {
        dispatch(SetCurrentStep(currentStep + 1));
      } else {
        // Handle final submission
        console.log('Final submission:', formData);
        // You can make API call here
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      // dispatch(SetSubmitting(false));
    }
  };


    const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <SignupForm
            onSubmit={(values) => handleSubmit(values, 'signup')}
          />
        );
      case 2:
        return (
          <PersonalInfoForm
            onSubmit={(values) => handleSubmit(values, 'personal')}

          />
        );
      case 3:
        return (
          <FinancialInfoForm
      
            onSubmit={(values) => handleSubmit(values, 'financial')}
           
          />
        );
      default:
        return null;
    }
  };

  return renderForm();
};