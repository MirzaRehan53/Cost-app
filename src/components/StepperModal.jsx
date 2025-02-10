import React from "react";
import { useSelector } from "react-redux";

const steps = [
  { number: 1, title: "Product_Service" },
  { number: 2, title: "Direct Cost" },
  { number: 3, title: "Allocation Method" },
  { number: 4, title: "Indirect Cost" },
  { number: 5, title: "All Costs" },
  { number: 6, title: "Summary of Cost (Result)" },
];

const StepperModal = ({ setIsStepperOpen }) => {
  const costCalculator = useSelector((state) => state.costCalculator);
  const currentStep = costCalculator.currentStep;
  console.log(currentStep);
  return (
    <div className=" py-6 p-4">
      <div className=" border-b pb-4 mb-5 border-gray-200">
        <div className="flex justify-between ">
          <h2 className="text-xl font-bold">Steps and Procedures</h2>
          <button
            onClick={() => setIsStepperOpen(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>
      </div>

      {/* Steps */}
      <div className="p-4">
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute left-[15px] top-8 w-0.5 h-12 bg-gray-300" />
              )}

              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-sm flex items-center justify-center transition-colors duration-200 ${
                    step.number === currentStep
                      ? "bg-blue-500 text-white"
                      : step.number < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                  style={{ transform: "rotate(45deg)" }}
                >
                  <span style={{ transform: "rotate(-45deg)" }}>
                    {step.number}
                  </span>
                </div>
                <span className="ml-4 font-medium text-gray-700">
                  {step.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepperModal;
