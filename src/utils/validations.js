import * as yup from "yup";

export const productInfoSchema = yup.object().shape({
  productType: yup.string().optional(),
  productName: yup.string().required("Product name is required"),
});

export const allocationMethodSchema = yup.object().shape({
  allocationMethod: yup.string().required("Allocation method is required"),
});
