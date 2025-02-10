import * as yup from "yup";

export const productInfoSchema = yup.object().shape({
  productType: yup.string().required("Product type is required"),
  productName: yup.string().required("Product name is required"),
});
