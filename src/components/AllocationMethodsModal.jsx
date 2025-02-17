import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllocationMethod } from "../store/slices/allocationMethodSlice";
import { setCurrentStep } from "../store/slices/costCalculatorSlice";

const AllocationModal = ({ setShowModal }) => {
  const allocationMethodReducer = useSelector(
    (state) => state.allocationMethod
  );
  const selectedMethodDetails = allocationMethodReducer.selectedMethodDetail;
  const [selectedMethod, setSelectedMethod] = useState(
    selectedMethodDetails
      ? selectedMethodDetails
      : {
          id: "1",
          label: "Traditional (Single) Overhead Rates",
          optional: false,
        }
  );

  const dispatch = useDispatch();

  const methods = [
    { id: "1", label: "Traditional (Single) Overhead Rates", optional: false },
    { id: "2", label: "Departmental Overhead Rates", optional: true },
    { id: "3", label: "Activity-Based Costing (ABC)", optional: true },
    { id: "4", label: "Direct Labor Costs", optional: true },
    { id: "5", label: "Machine Hours", optional: true },
    { id: "6", label: "Units Produced", optional: true },
    { id: "7", label: "Reciprocal Method", optional: true },
    { id: "8", label: "Direct Material Costs", optional: true },
    { id: "9", label: "Floor Space (Square Footage)", optional: true },
    { id: "10", label: "Sales Revenue", optional: true },
  ];

  const handleMethodToggle = (method) => {
    setSelectedMethod(method);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 border-2 border-skyBlue">
      <div
        className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm h-full w-full"
        onClick={() => setShowModal(false)}
      ></div>
      <div
        className="w-[600px]  relative z-50 backdrop-blur-lg border-darkBlue border rounded-[20px] shadow-lg p-6"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #CED2D6 124.35%)",
        }}
      >
        <div className="space-y-3">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Allocation Method
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Select allocation methods
            </p>
          </div>

          <div className="space-y-1">
            {methods.map((method, ind) => (
              <label
                key={method.id}
                className="flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    value={method.id}
                    checked={selectedMethod.id === method.id}
                    onChange={() => handleMethodToggle(method)}
                    className="appearance-none w-4 h-4 rounded-full border  border-gray-300 checked:border-white checked:border-2 transition-all focus:outline-none checked:ring-2 checked:bg-darkBlue checked:ring-darkBlue"
                  />
                </div>
                <span
                  className={`${
                    selectedMethod.id == method.id
                      ? "text-gray-800"
                      : "text-gray-500"
                  } text-sm`}
                >
                  {method.label}
                  {method.optional && (
                    <span className="text-gray-400 ml-2">(Optional)</span>
                  )}
                </span>
              </label>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <button
              className="w-24 px-4 py-2 border hover:bg-skyBlue  border-gray-300 text-gray-700 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={() => setShowModal(false)}
            >
              Back
            </button>
            <button
              className="w-24 px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200"
              onClick={() => {
                dispatch(setAllocationMethod(selectedMethod));
                setShowModal(false);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationModal;
