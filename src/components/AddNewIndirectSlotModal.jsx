import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addIndirectCost } from "../store/slices/costCalculatorSlice";

const AddNewIndirectSlotModal = ({ setShowSlotModal }) => {
  const validationSchema = yup.object().shape({
    totalIndirectCosts: yup
      .number()
      .required("Total indirect costs is required")
      .positive("Total indirect costs must be positive")
      .typeError("Total indirect costs must be a number"),

    costDriver: yup
      .number()
      .required("Cost driver is required")
      .positive("Cost driver must be positive")
      .typeError("Cost driver must be a number"),
    totalCostDriverUnits: yup
      .number()
      .required("Total cost driver units is required")
      .positive("Total cost driver units must be positive")
      .typeError("Total cost driver units must be a number"),

    productName: yup
      .string()
      .required("Product name is required")
      .min(2, "Product name must be at least 2 characters"),

    unitsProduced: yup
      .number()
      .required("Units produced is required")
      .positive("Units produced must be positive")
      .integer("Units produced must be a whole number")
      .typeError("Units produced must be a number"),

    laborHoursPerUnit: yup
      .number()
      .required("Labor hours per unit is required")
      .positive("Labor hours per unit must be positive")
      .typeError("Labor hours per unit must be a number"),

    directCostPerUnit: yup
      .number()
      .required("Direct cost per unit is required")
      .positive("Direct cost per unit must be positive")
      .typeError("Direct cost per unit must be a number"),

    overheadRate: yup
      .number()
      .required("Predetermined overhead rate is required")
      .positive("Predetermined overhead rate must be positive")
      .typeError("Predetermined overhead rate must be a number"),
  });

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const randomString = Math.random().toString(36).substring(2, 10);

  const onSubmit = (data) => {
    // const id = Math.random().toString(36).substring(2, 10);
    // dispatch({ type: "ADD_INDIRECT_COST", payload: { ...data, id } });
    dispatch(addIndirectCost({ ...data, id: randomString }));

    console.log("data", data);
    setShowSlotModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">New Indirect Cost Slot</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-6"
        >
          <div>
            <label className="block font-medium mb-1 text-sm">
              Product Name
            </label>
            <input
              {...register("productName")}
              className="w-full p-2 py-[2px] border outline-none rounded focus:ring-1 placeholder:text-xs focus:ring-skyBlue"
              placeholder="Enter product name"
            />
            {errors.productName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.productName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1 text-sm">
              Units Produced
            </label>
            <input
              type="number"
              {...register("unitsProduced")}
              className="w-full p-2 py-[2px] border outline-none rounded focus:ring-1 placeholder:text-xs focus:ring-skyBlue"
              placeholder="Enter units produced"
            />
            {errors.unitsProduced && (
              <p className="text-red-500 text-xs mt-1">
                {errors.unitsProduced.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1 text-sm">
              Labor Hours Per Unit
            </label>
            <input
              type="number"
              {...register("laborHoursPerUnit")}
              className="w-full p-2 py-[2px] border outline-none rounded focus:ring-1 placeholder:text-xs focus:ring-skyBlue"
              placeholder="Enter labor hours per unit"
            />
            {errors.laborHoursPerUnit && (
              <p className="text-red-500 text-xs mt-1">
                {errors.laborHoursPerUnit.message}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1 text-sm">
              Direct Cost Per Unit
            </label>
            <input
              type="number"
              {...register("directCostPerUnit")}
              className="w-full p-2 py-[2px] border outline-none rounded focus:ring-1 placeholder:text-xs focus:ring-skyBlue"
              placeholder="Enter direct cost per unit"
            />
            {errors.directCostPerUnit && (
              <p className="text-red-500 text-xs mt-1">
                {errors.directCostPerUnit.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1 text-sm">
              Predetermined Overhead Rate
            </label>
            <input
              type="number"
              {...register("overheadRate")}
              className="w-full p-2 py-[2px] border outline-none rounded focus:ring-1 placeholder:text-xs focus:ring-skyBlue"
              placeholder="Enter predetermined overhead rate"
            />
            {errors.overheadRate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.overheadRate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1 text-sm">
              Total Indirect Costs
            </label>
            <input
              type="number"
              {...register("totalIndirectCosts")}
              className="w-full p-2 py-[2px] border outline-none rounded focus:ring-1 placeholder:text-xs focus:ring-skyBlue"
              placeholder="Enter total indirect costs"
            />
            {errors.totalIndirectCosts && (
              <p className="text-red-500 text-xs mt-1">
                {errors.totalIndirectCosts.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1 text-sm">
              Cost Driver
            </label>
            <input
              {...register("costDriver")}
              type="number"
              className="w-full p-2 py-[2px] border outline-none rounded focus:ring-1 placeholder:text-xs focus:ring-skyBlue"
              placeholder="Enter cost driver"
            />
            {errors.costDriver && (
              <p className="text-red-500 text-xs mt-1">
                {errors.costDriver.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1 text-sm">
              Total Cost Driver Units
            </label>
            <input
              type="number"
              {...register("totalCostDriverUnits")}
              className="w-full p-2 py-[2px] border outline-none rounded focus:ring-1 placeholder:text-xs focus:ring-skyBlue"
              placeholder="Enter total cost driver units"
            />
            {errors.totalCostDriverUnits && (
              <p className="text-red-500 text-xs mt-1">
                {errors.totalCostDriverUnits.message}
              </p>
            )}
          </div>
        </form>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setShowSlotModal(false)}
            className="px-4 py-1 text-sm bg-gray-200 border border-darkBlue text-gray-800 rounded hover:bg-gray-300"
          >
            Back
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="px-4 py-1 bg-darkBlue text-sm text-white rounded hover:bg-skyBlue"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewIndirectSlotModal;
