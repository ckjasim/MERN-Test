import { RootState } from "@/redux/store";
import  { Fragment } from "react";
import { useSelector } from "react-redux";

export const StepIndicator = () => {
  const { currentStep } = useSelector((state: RootState) => state.Auth);

  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      {Array.from({ length: 2 }, (_, index) => (
        <Fragment key={index}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index + 1 === currentStep-1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </div>
   
        </Fragment>
      ))}
    </div>
  );
};