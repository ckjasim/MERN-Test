import { RootState } from '@/redux/store';
import { StepIndicator } from './StepIndicator';
import { useSelector } from 'react-redux';
import { ReactNode } from 'react';

interface FormLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  subtitle,
  children,
}) => {
  const { currentStep } = useSelector((state: RootState) => state.Auth);
  return (
    <div className="max-w-lg mx-auto p-6 px-12">
      <div className="mb-8 flex flex-col items-center">
        {currentStep && currentStep > 1 && <StepIndicator />}
        
        <h1 className="text-2xl font-bold mb-1">{title}</h1>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};
