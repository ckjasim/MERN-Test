import  { Fragment } from "react";

export const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      {Array.from({ length: totalSteps }, (_, index) => (
        <Fragment key={index}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index + 1 <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div className="h-1 w-8 bg-gray-200" />
          )}
        </Fragment>
      ))}
    </div>
  );
};