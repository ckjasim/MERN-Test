import React from 'react';

import { SignupForm } from '../../components/forms/SignupForm';
import { FinancialInfoForm } from '../../components/forms/FinancialInfoForm';
import { PersonalInfoForm } from '../../components/forms/PersonalInfoForm';

export const AuthPage = () => {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    signup: {},
    personal: {},
    financial: {},
  });

  const handleSubmit = (values, { setSubmitting }) => {
    
    setFormData(prev => ({
      ...prev,
      [getFormKey()]: values,
    }));
    
    setSubmitting(false);
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Handle final submission
      console.log('Final form data:', formData);
    }
  };

  const getFormKey = () => {
    switch (step) {
      case 1: return 'signup';
      case 2: return 'personal';
      case 3: return 'financial';
      default: return 'signup';
    }
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return <SignupForm onSubmit={handleSubmit} />;
      case 2:
        return <PersonalInfoForm onSubmit={handleSubmit} />;
      case 3:
        return <FinancialInfoForm onSubmit={handleSubmit} />;
      default:
        return <SignupForm onSubmit={handleSubmit} />;
    }
  };

  return renderForm();
};