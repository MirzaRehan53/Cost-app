import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import costCalculatorReducer from "./slices/costCalculatorSlice";
import allocationMethodReducer from "./slices/allocationMethodSlice";
import indirectCostReducer from "./slices/indirectCostSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    costCalculator: costCalculatorReducer,
    allocationMethod: allocationMethodReducer,
    indirectCost: indirectCostReducer,
  },
});

export default store;
