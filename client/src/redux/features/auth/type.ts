export interface FormData {
  signup: {
    email: string;
    mobile: string;
    password: string;
    confirmPassword: string;
  };
  personal: {
    title: string;
    fullName: string;
    dateOfBirth: string;
    currentAddress: string;
    addressDuration: string;
    aboutYourself: string;
  };
  financial: {
    employmentStatus: string;
    additionalInvestments: string;
  };
}

export interface AuthState {
  currentStep: number;
  formData: FormData;
  isSubmitting: boolean;
  error: string | null;
}