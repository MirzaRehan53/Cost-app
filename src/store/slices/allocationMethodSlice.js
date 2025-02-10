import { createSlice } from "@reduxjs/toolkit";

// Define headers for each allocation method
const allocationHeaders = {
  traditionalOverheadRates: [
    "Name",
    "Unit Produced",
    "Labour Hours Per Unit",
    "Direct Cost Per Unit",
  ],
  directLabor: [
    "Cost Pool",
    "Total Cost",
    "Direct Labor Hours",
    "Rate per Labor Hour",
  ],
  machineHours: [
    "Cost Pool",
    "Total Cost",
    "Machine Hours",
    "Rate per Machine Hour",
  ],
};

const initialState = {
  selectedMethod: "",
  headers: [],
  allocationRates: {},
};

const allocationMethodSlice = createSlice({
  name: "allocationMethod",
  initialState,
  reducers: {
    setAllocationMethod: (state, action) => {
      console.log("reducerrrrrrrrrr", action.payload);
      let { label } = action.payload;
      state.selectedMethod = label;
      // state.headers = Object.entries(allocationHeaders)[Number(id) - 1] || [];
    },
    updateAllocationRates: (state, action) => {
      state.allocationRates = { ...state.allocationRates, ...action.payload };
    },
  },
});

export const { setAllocationMethod, updateAllocationRates } =
  allocationMethodSlice.actions;
export default allocationMethodSlice.reducer;
