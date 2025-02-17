import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addDirectCost } from "../store/slices/costCalculatorSlice";

const NewSlotModal = ({ setShowSlotModal }) => {
  const categories = ["Raw Materials", "Packaging", "Labor", "Other"];

  const dcTypes = ["Variable", "Fixed"];

  const unitMeasures = [
    "Pieces",
    "Kilograms",
    "Grams",
    "Liters",
    "Hours",
    "Meters",
    "Units",
  ];

  const validationSchema = yup.object().shape({
    directCostName: yup
      .string()
      .required("Direct Cost Name is required")
      .min(3, "Direct Cost Name must be at least 3 characters")
      .max(50, "Direct Cost Name must not exceed 50 characters"),

    purchaseUnitCost: yup
      .number()
      .required("Purchase Unit Cost is required")
      .positive("Purchase Unit Cost must be positive")
      .typeError("Purchase Unit Cost must be a number"),

    category: yup
      .string()
      .required("Category is required")
      .oneOf(categories, "Please select a valid category"),

    inputQuantityMeasure: yup
      .string()
      .required("Input Quantity Measure is required")
      .oneOf(unitMeasures, "Please select a valid measure"),

    dcType: yup
      .string()
      .required("DC Type is required")
      .oneOf(dcTypes, "Please select a valid DC type"),

    totalQuantityMeasure: yup
      .number()
      .required("Total Quantity Measure is required")
      .positive("Total Quantity Measure must be positive")
      .typeError("Total Quantity Measure must be a number"),

    dcPurchaseUnitMeasure: yup
      .string()
      .required("DC Purchase Unit Measure is required")
      .oneOf(unitMeasures, "Please select a valid measure"),

    inputQuantityPerUnit: yup
      .number()
      .required("Input Quantity per Unit is required")
      .positive("Input Quantity per Unit must be positive")
      .typeError("Input Quantity per Unit must be a number"),

    dcPurchaseUnit: yup.string().required("DC Purchase Unit is required"), // .oneOf(unitMeasures, "Please select a valid unit"),
    // costPerInputQuantity: yup
    //   .number()
    //   .required("Cost per Input Quantity is required")
    //   .positive("Cost per Input Quantity must be positive")
    //   .typeError("Cost per Input Quantity must be a number"),

    // subtotalCost: yup
    //   .number()
    //   .required("Subtotal Cost is required")
    //   .positive("Subtotal Cost must be positive")
    //   .typeError("Subtotal Cost must be a number"),
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
    dispatch(addDirectCost({ ...data, id: randomString }));
    setShowSlotModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">New Slot</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-6"
        >
          <div>
            <label className="block font-medium mb-1 text-sm">
              Direct Cost Name
            </label>
            <input
              {...register("directCostName")}
              className="w-full p-2 py-[2px]  border outline-none rounded focus:ring-1 placeholder:text-xs  focus:ring-skyBlue"
              placeholder="Enter Direct Cost Name"
            />
            {errors.directCostName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.directCostName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1 text-sm">
              Category/Grouping
            </label>
            <select
              {...register("category")}
              className="w-full p-2 py-[2px]  border outline-none rounded focus:ring-1 placeholder:text-xs  focus:ring-skyBlue"
            >
              <option value="" className="text-sm">
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1 text-sm">DC Type</label>
            <select
              {...register("dcType")}
              className="w-full p-2 py-[2px]  border outline-none rounded focus:ring-1 placeholder:text-xs  focus:ring-skyBlue"
            >
              <option value="" className="text-sm">
                Select DC Type
              </option>
              {dcTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.dcType && (
              <p className="text-red-500 text-xs mt-1">
                {errors.dcType.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1 text-sm">
              DC Purchase Unit Measure
            </label>
            <select
              {...register("dcPurchaseUnitMeasure")}
              className="w-full p-2 py-[2px]  border outline-none rounded focus:ring-1 placeholder:text-xs  focus:ring-skyBlue"
            >
              <option value="" className="text-sm">
                Select Measure
              </option>
              {unitMeasures.map((measure) => (
                <option key={measure} value={measure} className="text-xs">
                  {measure}
                </option>
              ))}
            </select>
            {errors.dcPurchaseUnitMeasure && (
              <p className="text-red-500 text-xs mt-1">
                {errors.dcPurchaseUnitMeasure.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1 text-sm">
              DC Purchase Unit
            </label>
            <input
              type="number"
              {...register("dcPurchaseUnit")}
              className="w-full p-2 py-[2px]  border outline-none rounded focus:ring-1 placeholder:text-xs  focus:ring-skyBlue"
              placeholder="Enter DC purchase Unit"
            />
            {errors.dcPurchaseUnit && (
              <p className="text-red-500 text-xs mt-1">
                {errors.dcPurchaseUnit.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1 text-sm">
              Purchase Unit Cost
            </label>
            <input
              type="number"
              {...register("purchaseUnitCost")}
              className="w-full p-2 py-[2px]  border outline-none rounded focus:ring-1 placeholder:text-xs  focus:ring-skyBlue"
              placeholder="Enter Purchase Unit Cost"
            />
            {errors.purchaseUnitCost && (
              <p className="text-red-500 text-xs mt-1">
                {errors.purchaseUnitCost.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1 text-sm">
              Input Quantity Measure
            </label>
            <select
              {...register("inputQuantityMeasure")}
              className="w-full p-2 py-[2px]  border outline-none rounded focus:ring-1 placeholder:text-xs  focus:ring-skyBlue"
            >
              <option value="" className="text-sm">
                Select Measure
              </option>
              {unitMeasures.map((measure) => (
                <option key={measure} value={measure}>
                  {measure}
                </option>
              ))}
            </select>
            {errors.inputQuantityMeasure && (
              <p className="text-red-500 text-xs mt-1">
                {errors.inputQuantityMeasure.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1 text-sm">
              Input Quantity in each Purchase Unit
            </label>
            <input
              type="number"
              {...register("inputQuantityPerUnit")}
              className="w-full p-2 py-[2px]  border outline-none rounded focus:ring-1 placeholder:text-xs  focus:ring-skyBlue"
              placeholder="Enter Input Quantity per Unit"
            />
            {errors.inputQuantityPerUnit && (
              <p className="text-red-500 text-xs mt-1">
                {errors.inputQuantityPerUnit.message}
              </p>
            )}
          </div>

          {/* <div>
            <label className="block font-medium mb-1 text-sm">
              Cost per Input Quantity
            </label>
            <input
              type="number"
              {...register("costPerInputQuantity")}
              className="w-full p-2 py-[2px]  border outline-none rounded focus:ring-1 placeholder:text-xs  focus:ring-skyBlue"
              placeholder="Enter Cost per Input Quantity"
            />
            {errors.costPerInputQuantity && (
              <p className="text-red-500 text-xs mt-1">
                {errors.costPerInputQuantity.message}
              </p>
            )}
          </div> */}

          <div>
            <label className="block font-medium mb-1 text-sm">
              Input Quantity used in product
            </label>
            <input
              type="number"
              {...register("totalQuantityMeasure")}
              className="w-full p-2 py-[2px]  border outline-none rounded focus:ring-1 placeholder:text-xs  focus:ring-skyBlue"
              placeholder="Enter Total Quantity Measure"
            />
            {errors.totalQuantityMeasure && (
              <p className="text-red-500 text-xs mt-1">
                {errors.totalQuantityMeasure.message}
              </p>
            )}
          </div>
          {/* 
          <div>
            <label className="block font-medium mb-1 text-sm">
              IQ Unit in Product
            </label>
            <select
              {...register("iqUnitInProduct")}
              className="w-full p-2 py-[2px]  border outline-none rounded focus:ring-1 placeholder:text-xs  focus:ring-skyBlue"
            >
              <option value="" className="text-sm">
                Select Unit
              </option>
              {unitMeasures.map((measure) => (
                <option key={measure} value={measure}>
                  {measure}
                </option>
              ))}
            </select>
            {errors.iqUnitInProduct && (
              <p className="text-red-500 text-xs mt-1">
                {errors.iqUnitInProduct.message}
              </p>
            )}
          </div> */}

          {/* <div>
            <label className="block font-medium mb-1 text-sm">
              Subtotal Cost
            </label>
            <input
              type="number"
              {...register("subtotalCost")}
              className="w-full p-2 py-[2px]  border outline-none rounded focus:ring-1 placeholder:text-xs  focus:ring-skyBlue"
              placeholder="Enter Subtotal Cost"
            />
            {errors.subtotalCost && (
              <p className="text-red-500 text-xs mt-1">
                {errors.subtotalCost.message}
              </p>
            )}
          </div> */}
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

export default NewSlotModal;
