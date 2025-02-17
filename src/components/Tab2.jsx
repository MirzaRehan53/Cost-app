import React, { useState, useEffect } from "react";
import tooltipIcon from "../assets/tooltip.svg";
import Input from "./Input";
import AllocationModal from "./AllocationMethodsModal";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep } from "../store/slices/costCalculatorSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { allocationMethodSchema } from "../utils/validations";

const Tab2 = ({ handleNextButton, handleBackButton, inputValue }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const allocationMethodReducer = useSelector(
    (state) => state.allocationMethod
  );
  const selectedAllocationMethod = allocationMethodReducer.selectedMethod;

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(allocationMethodSchema),
    defaultValues: {
      allocationMethod: selectedAllocationMethod || "", // Set initial value from Redux
    },
    mode: "onChange",
  });

  // Update form when Redux state changes
  useEffect(() => {
    if (selectedAllocationMethod) {
      setValue("allocationMethod", selectedAllocationMethod, {
        shouldValidate: true, // This will trigger validation
      });
    }
  }, [selectedAllocationMethod, setValue]);

  const onSubmit = (data) => {
    console.log(data);
    handleNextButton();
    dispatch(setCurrentStep(4));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full border border-skyBlue rounded-[20px] h-[400px] relative top-[30px] p-5">
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-2 justify-start self-start items-start">
              Allocation Method
              <span className="flex flex-row gap-0.5 items-center justify-center text-extraDarkBlue font-semibold">
                <span>What is this?</span>
                <span>
                  <img src={tooltipIcon} alt="" />
                </span>
              </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  {...register("allocationMethod")}
                  className={`min-w-full border-skyBlue border bg-transparent px-3 rounded-[5px] h-[30px] placeholder:text-darkBlue placeholder:text-[14px] font-medium`}
                  value={selectedAllocationMethod}
                  onClick={() => setShowModal(true)}
                  readOnly={true}
                />
                {errors.allocationMethod && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.allocationMethod.message}
                  </p>
                )}
              </div>
              <div className="flex flex-row justify-between w-full pt-3">
                <div>
                  <button
                    type="button"
                    className="border hover:bg-skyBlue border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
                    onClick={handleBackButton}
                  >
                    Back
                  </button>
                </div>
                <div>
                  <button
                    className="border hover:bg-skyBlue bg-darkBlue text-white border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
                    type="submit"
                  >
                    Next
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="fixed z-50">
        {showModal && <AllocationModal setShowModal={setShowModal} />}
      </div>
    </div>
  );
};

export default Tab2;
