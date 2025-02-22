import { PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./type";

export const updateFormData = (
  state: AuthState,
  action: PayloadAction<{ formType: keyof AuthState['formData']; data: Partial<AuthState['formData'][keyof AuthState['formData']]> }>
) => {
  const { formType, data } = action.payload;
  
  state.formData = {
    ...state.formData,
    [formType]: { ...state.formData[formType], ...data }
  };
};

export const setCurrentStep = (state: AuthState, action: PayloadAction<number>) => {
  state.currentStep = action.payload;
};

export const setSubmitting = (state: AuthState, action: PayloadAction<boolean>) => {
  state.isSubmitting = action.payload;
};

export const setError = (state: AuthState, action: PayloadAction<string | null>) => {
  state.error = action.payload;
};
