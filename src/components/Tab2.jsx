import React, { useState } from "react";
import tooltipIcon from "../assets/tooltip.svg";
import Input from "./Input";
import AllocationModal from "./AllocationMethodsModal";
import { useSelector } from "react-redux";
const Tab2 = ({
  handleNextButton,
  // selectedAllocationMethod = "sdad",
  handleBackButton,
  inputValue,
  setValue,
}) => {
  const [showModal, setShowModal] = useState(false);
  const allocationMethodReducer = useSelector(
    (state) => state.allocationMethod
  );
  const selectedAllocationMethod = allocationMethodReducer.selectedMethod;
  console.log("Redux State Updated:", allocationMethodReducer.selectedMethod);
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full  border border-skyBlue rounded-[20px]  h-[400px] relative top-[30px] p-5">
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col gap-6 ">
            <div className="flex flex-row gap-2 justify-start self-start items-start">
              {" "}
              Allocation Method
              <span className="flex flex-row gap-0.5 items-center justify-center text-extraDarkBlue font-semibold">
                <span>What is this?</span>
                <span>
                  <img src={tooltipIcon} alt="" />
                </span>
              </span>
            </div>
            <div>
              <Input
                placeholder={selectedAllocationMethod}
                value={selectedAllocationMethod}
                // onChange={(e) => setValue(e.target.value)}
                onClick={() => setShowModal(true)}
                readOnly={true}
              />
              {/* <input type="text" read /> */}
            </div>
            <div className="flex flex-row justify-between w-full pt-3">
              <div>
                <button
                  className="border hover:bg-skyBlue border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
                  onClick={handleBackButton}
                >
                  Back
                </button>
              </div>
              <div>
                <button
                  className="border hover:bg-skyBlue bg-darkBlue text-white border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
                  onClick={handleNextButton}
                >
                  Next
                </button>
              </div>
            </div>
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
