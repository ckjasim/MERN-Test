import {createSlice} from "@reduxjs/toolkit"
import { AuthState } from "./type";
import {  setCurrentStep, setError, setSubmitting,  updateFormData } from "./fn";


const initialState:AuthState = {
  currentStep: 1,
  formData: {
    signup: {
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
    },
    personal: {
      title: '',
      fullName: '',
      dateOfBirth: '',
      currentAddress: '',
      addressDuration: '',
      aboutYourself: '',
    },
    financial: {
      employmentStatus: '',
      additionalInvestments: '',
    },
  },
  isSubmitting: false,
  error: null,
};

const authSlice =createSlice({
  name:"auth",
  initialState,
  reducers:{
    UpdateFormData: updateFormData ,
    SetCurrentStep:setCurrentStep,
    SetSubmitting:setSubmitting,
    SetError:setError,
    ResetForm: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase('LOGOUT', () => initialState); 
  },
})

export const {UpdateFormData,SetCurrentStep,SetSubmitting,SetError,ResetForm}=authSlice.actions
export default authSlice.reducer