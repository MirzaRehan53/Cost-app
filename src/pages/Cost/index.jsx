import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import CustomTable from "../../components/CustomTable";
import Tab2 from "../../components/Tab2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IndirectCostModal from "../../components/IndirectCostModal";
import StepperModal from "../../components/StepperModal";
import { useDispatch, useSelector } from "react-redux";
import {
  removeDirectCost,
  removeIndirectCost,
  removeMultipleDirectCosts,
  removeMultipleIndirectCosts,
  setCurrentStep,
  updateDirectCost,
  updateIndirectCost,
} from "../../store/slices/costCalculatorSlice";
import AddNewSlotModal from "../../components/AddNewSlotModal";
import { productInfoSchema } from "../../utils/validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProductInfo } from "../../store/slices/costCalculatorSlice";
import { direcCostHeaders } from "../../utils/headers";
import AddNewIndirectSlotModal from "../../components/AddNewIndirectSlotModal";

const CostPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [showIndirectSlotModal, setShowIndirectSlotModal] = useState(false);
  const [isStepperOpen, setIsStepperOpen] = useState(false);

  const [inputValue2, setInputValue2] = useState("");
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const costCalculator = useSelector((state) => state.costCalculator);
  const allocationMethodReducer = useSelector(
    (state) => state.allocationMethod
  );
  const currentAllocationMethod = allocationMethodReducer.selectedMethod;
  const indirectCostHeaders = allocationMethodReducer.headers;
  console.log(indirectCostHeaders, "asdddddddddddddddddd");
  const currentStep = costCalculator.currentStep;
  const directCostData = costCalculator.directCosts;
  const indirectCostsData = costCalculator.indirectCosts;
  console.log("hey", directCostData);

  const steps = [
    { number: 1, title: "Product_Service" },
    { number: 2, title: "Direct Cost" },
    { number: 3, title: "Allocation Method" },
    { number: 4, title: "Indirect Cost" },
    { number: 5, title: "All Costs" },
    { number: 6, title: "Summary of Cost (Result)" },
  ];
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productInfoSchema),
    mode: "onChange",
    defaultValues: {
      productType: "", // Ensure these exist
      productName: "",
    },
  });

  // Log values to check if they are being updated
  console.log("Product Type:", getValues("productType"));
  console.log("Product Name:", getValues("productName"));

  const onSubmit = (data) => {
    switch (tab) {
      case 0:
        dispatch(updateProductInfo(data));
        dispatch(setCurrentStep(2));
        break;
      // case 1:
      //   dispatch(addDirectCost(data));
      //   break;
      // case 2:
      //   dispatch(setAllocationMethod(data));
      //   break;
      // case 3:
      //   dispatch(updateIndirectCosts(data));
      //   break;
      default:
        break;
    }

    console.log(data);
    setTab(tab + 1);

    // setShowSlotModal(false);
  };

  // const handleNext = () => {
  //   if (currentStep < steps.length) {
  //     setCurrentStep(currentStep + 1);
  //   }
  // };

  // const handlePrevious = () => {
  //   if (currentStep > 1) {
  //     setCurrentStep(currentStep - 1);
  //   }
  // };

  const handleNextClick = () => {
    setTab(tab + 1);
  };
  const handlePrevClick = () => {
    if (tab > 0) {
      setTab(tab - 1);
    }
  };

  const handleNextDirectCostClick = () => {
    dispatch(setCurrentStep(3));
    console.log(currentStep);

    setTab(tab + 1);
  };

  //Direct Costs
  const handleUpdateDirectCostData = (index, data) => {
    dispatch(updateDirectCost({ index, data }));
  };

  const handleDeleteDirectCostData = (index) => {
    // Implement your delete action
    dispatch(removeDirectCost(index));
  };

  const handleDeleteDirectCostMultiple = (indexes) => {
    // Implement your multiple delete action
    dispatch(removeMultipleDirectCosts(indexes));
  };

  //Indirect Costs
  const handleUpdateIndirectCostData = (index, data) => {
    dispatch(updateIndirectCost({ index, data }));
  };

  const handleDeleteIndirectCostData = (index) => {
    dispatch(removeIndirectCost(index));
  };

  const handleDeleteIndirectCostMultiple = (indexes) => {
    dispatch(removeMultipleIndirectCosts(indexes));
  };

  return (
    <>
      <div className="fixed -left-[88px]    flex w-[300px]  h-full items-center">
        <div
          className="rounded-br-lg rounded-bl-lg hover:!bg-darkBlue hover:text-white transition-colors duration-300 ease-in-out absolute cursor-pointer -rotate-90 p-2 px-5"
          style={{ background: "rgba(113, 131, 154, 0.2)" }}
          onClick={() => setIsStepperOpen(true)}
        >
          Steps and Procedures
        </div>
      </div>
      <div
        className="flex flex-col items-center
       justify-center min-h-screen gap-10  text-customBlack px-20"
      >
        {tab === 0 ? (
          <div className="flex flex-row gap-10 justify-between w-full">
            <div
              className="w-1/3 h-[415px] border p-5 rounded-[20px] border-skyBlue overflow-y-auto"
              style={{
                background:
                  "linear-gradient(180deg, #FFFFFF 0%, #CED2D6 124.35%)",
              }}
            >
              <div className="flex flex-col gap-5">
                <div className="text-[28px] font-semibold leading-[36px]">
                  Product List
                </div>
                <div className="flex flex-col gap-4 ">
                  <div className="border-b-2 font-medium border-[rgba(113_131_154)] border-opacity-20">
                    Baking powder
                  </div>
                  <div className="border-b-2 font-medium  border-[rgba(113_131_154)] border-opacity-20">
                    Pinapple{" "}
                  </div>
                  <div className="border-b-2 font-medium  border-[rgba(113_131_154)] border-opacity-20">
                    Strawberry
                  </div>
                  <div className="border-b-2 font-medium  border-[rgba(113_131_154)] border-opacity-20">
                    Pista
                  </div>
                  <div className="border-b-2 font-medium  border-[rgba(113_131_154)] border-opacity-20">
                    Suger
                  </div>
                  <div className="border-b-2 font-medium  border-[rgba(113_131_154)] border-opacity-20">
                    Milk powder
                  </div>
                  <div className="border-b-2 font-medium border-[rgba(113_131_154)] border-opacity-20">
                    Baking powder
                  </div>
                  <div className="border-b-2 font-medium border-[rgba(113_131_154)] border-opacity-20">
                    Baking powder
                  </div>
                  <div className="border-b-2 font-medium border-[rgba(113_131_154)] border-opacity-20">
                    Baking powder
                  </div>
                  <div className="border-b-2 font-medium border-[rgba(113_131_154)] border-opacity-20">
                    Baking powder
                  </div>
                  <div className="border-b-2 font-medium border-[rgba(113_131_154)] border-opacity-20">
                    Baking powder
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-2/3 h-[415px] border rounded-[20px] p-5 border-skyBlue"
              style={{
                background:
                  "linear-gradient(180deg, #FFFFFF 0%, #CED2D6 124.35%)",
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="h-full">
                <div className="flex flex-col h-full w-full  gap-5">
                  <div className="text-[28px] font-semibold leading-[36px]">
                    {" "}
                    Product Service Name
                  </div>
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col gap-6 h-full items-center justify-center">
                      <div className="w-full">
                        <div className="text-[18px] self-start text-start font-semibold leading-[36px]">
                          Write the type of your product group
                        </div>
                        <div className="w-full  flex flex-col items-start justify-start ">
                          <input
                            {...register("productType")}
                            className="w-full p-2 py-[2px] bg-transparent border border-darkBlue outline-none rounded focus:ring-1 placeholder:text-xs  focus:ring-extraDarkBlue"
                            placeholder="Write the type of your product"
                          />
                          {errors.productType && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.productType.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="text-[18px] self-start text-start font-semibold leading-[36px]">
                          Write the name of your product or service?
                        </div>
                        <div className="w-full flex flex-col items-start justify-center ">
                          <input
                            {...register("productName")}
                            className="w-full p-2 py-[2px] bg-transparent border border-darkBlue outline-none rounded focus:ring-1 placeholder:text-xs  focus:ring-extraDarkBlue"
                            placeholder="Write the type of your product"
                          />
                          {errors.productName && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.productName.message}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-row items-end w-full relative  justify-end ">
                          <Button className="mt-5" type={"submit"}>
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : tab === 1 ? (
          <div
            className="w-full border border-skyBlue rounded-[20px] min-h-[515px] h-max relative top-[30px] p-5"
            style={{
              background:
                "linear-gradient(180deg, #FFFFFF 0%, #CED2D6 124.35%)",
            }}
          >
            <div className="flex flex-row w-full justify-between">
              <div className="text-[24px] font-semibold leading-[39px]">
                Direct Cost{" "}
              </div>
              <div>
                <button
                  className="border hover:bg-skyBlue hover:text-white border-skyBlue w-[142px] h-[30px] rounded-md text-sm font-semibold text-center"
                  onClick={() => [
                    setShowSlotModal(true),
                    console.log("clicked"),
                  ]}
                >
                  Add new cost
                </button>{" "}
              </div>
            </div>
            <CustomTable
              values={directCostData}
              headers={direcCostHeaders}
              headerText={"Direct Costs"}
              onUpdateData={handleUpdateDirectCostData}
              onDeleteData={handleDeleteDirectCostData}
              onDeleteMultiple={handleDeleteDirectCostMultiple}
            />
            <div className="flex flex-row justify-between w-full pt-3">
              <div>
                <button
                  className="border hover:bg-skyBlue border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
                  onClick={handlePrevClick}
                >
                  Back
                </button>
              </div>
              <div>
                <button
                  className="border hover:bg-skyBlue bg-darkBlue text-white border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
                  onClick={handleNextDirectCostClick}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : tab === 2 ? (
          <>
            <Tab2
              inputValue={inputValue2}
              setValue={setInputValue2}
              handleNextButton={handleNextClick}
              handleBackButton={handlePrevClick}
            />
          </>
        ) : tab === 3 ? (
          <div
            className="w-full border border-skyBlue rounded-[20px] min-h-[515px] h-max relative top-[30px] p-5"
            style={{
              background:
                "linear-gradient(180deg, #FFFFFF 0%, #CED2D6 124.35%)",
            }}
          >
            <div className="flex flex-row w-full justify-between">
              <div className="text-[24px] font-semibold leading-[39px]">
                Indirect Cost{" "}
              </div>
              <div>
                <button
                  className="border hover:bg-skyBlue hover:text-white border-skyBlue w-max px-3 h-[30px] rounded-md text-sm font-semibold text-center"
                  onClick={() => [setShowIndirectSlotModal(true)]}
                >
                  Add new indirect cost
                </button>{" "}
              </div>
            </div>
            <CustomTable
              headerText={"Product Details:"}
              values={indirectCostsData}
              headers={Array.from(indirectCostHeaders)}
              onUpdateData={handleUpdateIndirectCostData}
              onDeleteData={handleDeleteIndirectCostData}
              onDeleteMultiple={handleDeleteIndirectCostMultiple}
            />
            <div className="flex flex-row justify-between w-full pt-3">
              <div>
                <button
                  className="border hover:bg-skyBlue border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
                  onClick={handlePrevClick}
                >
                  Back
                </button>
              </div>
              <div>
                <button
                  className="border hover:bg-skyBlue bg-darkBlue text-white border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
                  onClick={() => navigate("/dashboard")}
                >
                  Result
                </button>
              </div>
            </div>
          </div>
        ) : (
          // ) : tab === 4 ? (
          //   <div
          //     className="w-full border border-skyBlue rounded-[20px] min-h-[515px] h-max relative top-[30px] p-5"
          //     style={{
          //       background:
          //         "linear-gradient(180deg, #FFFFFF 0%, #CED2D6 124.35%)",
          //     }}
          //   >
          //     <div className="flex flex-col w-full gap-6">
          //       <div className="text-[24px] font-semibold leading-[39px]">
          //         Indirect Cost: Step 2 (Calculations)
          //       </div>
          //       <div className="flex flex-row flex-wrap gap-4 items-center">
          //         <div className="flex flex-row gap-3">
          //           <div>Predetermined Overhead Rate</div>
          //           <div>
          //             <Input
          //               placeholder={"$ 12,000"}
          //               className={"h-[25px] w-[200px]"}
          //             />
          //           </div>
          //         </div>
          //         <div className="flex flex-row gap-3">
          //           <div>Result</div>
          //           <div>
          //             <Input
          //               placeholder={"Direct Labor Hours"}
          //               className={"h-[25px] w-[200px]"}
          //             />
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //     <CustomTable
          //       handleNextButton={handleNextClick}
          //       handleBackButton={handlePrevClick}
          //       headerText={"Total Labor Hours Per Product:"}
          //     />
          //     <div className="flex flex-row justify-between w-full pt-3">
          //       <div>
          //         <button
          //           className="border hover:bg-skyBlue border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
          //           onClick={handlePrevClick}
          //         >
          //           Back
          //         </button>
          //       </div>
          //       <div>
          //         <button
          //           className="border hover:bg-skyBlue bg-darkBlue text-white border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
          //           onClick={handleNextClick}
          //         >
          //           Next
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          // ) : tab === 5 ? (
          //   <div
          //     className="w-full border border-skyBlue rounded-[20px] min-h-[515px] h-max relative top-[30px] p-5"
          //     style={{
          //       background:
          //         "linear-gradient(180deg, #FFFFFF 0%, #CED2D6 124.35%)",
          //     }}
          //   >
          //     <div className="flex flex-col w-full gap-6">
          //       <div className="text-[24px] font-semibold leading-[39px]">
          //         Indirect Cost: Step 3 (Calculations)
          //       </div>
          //     </div>
          //     <CustomTable
          //       handleNextButton={handleNextClick}
          //       handleBackButton={handlePrevClick}
          //       headerText={"Overhead Allocated Per Product:"}
          //     />
          //     <div className="flex flex-row justify-between w-full pt-3">
          //       <div>
          //         <button
          //           className="border hover:bg-skyBlue border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
          //           onClick={handlePrevClick}
          //         >
          //           Back
          //         </button>
          //       </div>
          //       <div>
          //         <button
          //           className="border hover:bg-skyBlue bg-darkBlue text-white border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
          //           onClick={handleNextClick}
          //         >
          //           Next
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          // ) : tab === 6 ? (
          //   <div
          //     className="w-full border border-skyBlue rounded-[20px] min-h-[515px] h-max relative top-[30px] p-5"
          //     style={{
          //       background:
          //         "linear-gradient(180deg, #FFFFFF 0%, #CED2D6 124.35%)",
          //     }}
          //   >
          //     <div className="flex flex-col w-full gap-6">
          //       <div className="text-[24px] font-semibold leading-[39px]">
          //         Indirect Cost: Step 4 (Calculations)
          //       </div>
          //     </div>
          //     <CustomTable
          //       handleNextButton={handleNextClick}
          //       handleBackButton={handlePrevClick}
          //       headerText={"Total Direct Costs per Product:"}
          //     />
          //     <div className="flex flex-row justify-between w-full pt-3">
          //       <div>
          //         <button
          //           className="border hover:bg-skyBlue border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
          //           onClick={handlePrevClick}
          //         >
          //           Back
          //         </button>
          //       </div>
          //       <div>
          //         <button
          //           className="border hover:bg-skyBlue bg-darkBlue text-white border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
          //           onClick={handleNextClick}
          //         >
          //           Next
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          // ) : tab === 7 ? (
          //   <div
          //     className="w-full border border-skyBlue rounded-[20px] min-h-[515px] h-max relative top-[30px] p-5"
          //     style={{
          //       background:
          //         "linear-gradient(180deg, #FFFFFF 0%, #CED2D6 124.35%)",
          //     }}
          //   >
          //     <div className="flex flex-col w-full gap-6">
          //       <div className="text-[24px] font-semibold leading-[39px]">
          //         Indirect Cost: Step 5 (Calculations)
          //       </div>
          //     </div>
          //     <CustomTable
          //       handleNextButton={handleNextClick}
          //       handleBackButton={handlePrevClick}
          //       headerText={"Total Costs per Product:"}
          //     />
          //     <div className="flex flex-row justify-between w-full pt-3">
          //       <div>
          //         <button
          //           className="border hover:bg-skyBlue border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
          //           onClick={handlePrevClick}
          //         >
          //           Back
          //         </button>
          //       </div>
          //       <div>
          //         <button
          //           className="border hover:bg-skyBlue bg-darkBlue text-white border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
          //           onClick={handleNextClick}
          //         >
          //           Next
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          // ) : tab === 8 ? (
          //   <div
          //     className="w-full border border-skyBlue rounded-[20px] min-h-[515px] h-max relative top-[30px] p-5"
          //     style={{
          //       background:
          //         "linear-gradient(180deg, #FFFFFF 0%, #CED2D6 124.35%)",
          //     }}
          //   >
          //     <div className="flex flex-col w-full gap-6">
          //       <div className="text-[24px] font-semibold leading-[39px]">
          //         Indirect Cost: Step 6 (Calculations)
          //       </div>
          //     </div>
          //     <CustomTable headerText={"Cost per Unit of Product:"} />
          //     <div className="flex flex-row justify-between w-full pt-3">
          //       <div>
          //         <button
          //           className="border hover:bg-skyBlue border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
          //           onClick={handlePrevClick}
          //         >
          //           Back
          //         </button>
          //       </div>
          //       <div>
          //         <button
          //           className="border hover:bg-skyBlue bg-darkBlue text-white border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
          //           onClick={handleNextClick}
          //         >
          //           Next
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          // ) : tab === 9 ? (
          //   <div
          //     className="w-full border border-skyBlue rounded-[20px] min-h-[515px] h-max relative top-[30px] p-5"
          //     style={{
          //       background:
          //         "linear-gradient(180deg, #FFFFFF 0%, #CED2D6 124.35%)",
          //     }}
          //   >
          //     <div className="flex flex-row justify-between w-full gap-6">
          //       <div className="text-[24px] font-semibold leading-[39px]">
          //         All Costs
          //       </div>
          //       <div className="flex flex-row gap-3">
          //         <div
          //           className="text-sm border px-3 py-1 text-center h-[30px] flex items-center justify-center cursor-pointer hover:bg-slate-400 hover:text-white rounded-md border-skyBlue"
          //           onClick={() => setShowModal(true)}
          //         >
          //           Direct Cost
          //         </div>
          //         <div
          //           className="text-sm border px-3 py-1 text-center h-[30px] flex items-center justify-center cursor-pointer hover:bg-slate-400 hover:text-white rounded-md border-skyBlue"
          //           onClick={() => setShowModal(true)}
          //         >
          //           Indirect Cost
          //         </div>
          //       </div>
          //     </div>
          //     <CustomTable />
          //     <div className="flex flex-row justify-between w-full pt-3">
          //       <div>
          //         <button
          //           className="border hover:bg-skyBlue border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
          //           onClick={handlePrevClick}
          //         >
          //           Back
          //         </button>
          //       </div>
          //       <div>
          //         <button
          //           className="border hover:bg-skyBlue bg-darkBlue text-white border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold text-center"
          //           onClick={() => navigate("/dashboard")}
          //         >
          //           Result
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          // )

          ""
        )}
        <div className="fixed z-50">
          {showModal && <IndirectCostModal setShowModal={setShowModal} />}
          {isStepperOpen && (
            <>
              <div
                className={`fixed inset-0 h-full bg-black transition-opacity duration-300 ${
                  isStepperOpen ? "opacity-50" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsStepperOpen(false)}
              />

              <div
                className={`fixed top-1/2 left-10 rounded-[10px] h-max w-80  shadow-lg transform transition-transform duration-300 ease-in-out ${
                  isStepperOpen
                    ? "translate-x-0 -translate-y-1/2"
                    : "-translate-x-full -translate-y-1/2"
                }`}
                style={{
                  background:
                    "linear-gradient(180deg, #FFFFFF 0%, #CED2D6 124.35%)",
                }}
              >
                <StepperModal
                  setIsStepperOpen={setIsStepperOpen}
                  steps={steps}
                  currentStep={currentStep}
                />
              </div>
            </>
          )}
        </div>
        {showSlotModal && (
          <AddNewSlotModal setShowSlotModal={setShowSlotModal} />
        )}
        {showIndirectSlotModal && (
          <AddNewIndirectSlotModal
            setShowSlotModal={setShowIndirectSlotModal}
          />
        )}
      </div>
    </>
  );
};

export default CostPage;
