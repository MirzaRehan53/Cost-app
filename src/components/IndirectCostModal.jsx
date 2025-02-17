import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  costType: yup
    .string()
    .required("Cost type is required")
    .oneOf(["Fixed Cost", "Variable Cost"], "Please select a valid cost type"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .positive("Quantity must be positive")
    .integer("Quantity must be a whole number"),
  measuringUnit: yup.string().required("Measuring unit is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .positive("Amount must be positive"),
});

const IndirectCostModal = ({ setShowModal }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      costType: "",
      quantity: "",
      measuringUnit: "",
      amount: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
    setShowModal(false);
  };

  const costTypes = ["Fixed Cost", "Variable Cost"];

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm h-full w-full"></div>
      <div
        className="w-[600px] relative z-50 rounded-lg shadow-lg p-6"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #CED2D6 124.35%)",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">New Slot</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-900 font-medium mb-1 text-sm">
                Name
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter name"
                    className={`w-full px-3 py-2 border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-md bg-white placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-200`}
                  />
                )}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-900 text-sm font-medium mb-1">
                Description
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter Description"
                    className={`w-full px-3 py-2 border ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    } rounded-md bg-white  placeholder:text-sm  focus:outline-none focus:ring-2 focus:ring-blue-200`}
                  />
                )}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-900 text-sm font-medium mb-1">
                Cost Type
              </label>
              <Controller
                name="costType"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`w-full px-3 py-2 border ${
                      errors.costType ? "border-red-500" : "border-gray-300"
                    } rounded-md bg-white  placeholder:text-sm  focus:outline-none focus:ring-2 focus:ring-blue-200 appearance-none`}
                  >
                    <option value="" className="text-xs ">
                      <span className="">Select</span>
                    </option>
                    {costTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.costType && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.costType.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-900 font-medium text-sm mb-1">
                Quantity
              </label>
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Enter quantity"
                    className={`w-full px-3 py-2 border ${
                      errors.quantity ? "border-red-500" : "border-gray-300"
                    } rounded-md bg-white placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-200`}
                  />
                )}
              />
              {errors.quantity && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-1 text-sm">
                Measuring unit
              </label>
              <Controller
                name="measuringUnit"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter amount"
                    className={`w-full px-3 py-2 border ${
                      errors.measuringUnit
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md bg-white placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-200`}
                  />
                )}
              />
              {errors.measuringUnit && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.measuringUnit.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-1 text-sm">
                Amount
              </label>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Enter quantity"
                    className={`w-full px-3 py-2 border ${
                      errors.amount ? "border-red-500" : "border-gray-300"
                    } rounded-md bg-white placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-200`}
                  />
                )}
              />
              {errors.amount && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.amount.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              className="w-24 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={() => setShowModal(false)}
            >
              Back
            </button>
            <button
              type="submit"
              className="w-24 px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndirectCostModal;
