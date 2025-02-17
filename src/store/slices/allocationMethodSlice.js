import { createSlice } from "@reduxjs/toolkit";

// Define headers for each allocation method
const allocationHeaders = {
  traditionalOverheadRates: [
    { key: "productName", label: "Product Name" },
    { key: "unitsProduced", label: "Units Produced" },
    { key: "laborHoursPerUnit", label: "Labour Hours Per Unit" },
    { key: "directCostPerUnit", label: "Direct Cost Per Unit" },
    { key: "overheadRate", label: "Overhead Rate" },
    { key: "totalLaborHours", label: "Total Labor Hours" },
    { key: "overheadAllocated", label: "Overhead Allocated" },
    { key: "totalDirectCosts", label: "Total Direct Costs" },
    { key: "totalCostPerProduct", label: "Total Cost per Product" },
    { key: "costPerUnit", label: "Cost per Unit" },
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

const headerMapping = {
  0: "traditionalOverheadRates",
  1: "directLabor",
  2: "machineHours",
};

const initialState = {
  selectedMethodDetail: {},
  selectedMethod: "",
  headers: [],
  allocationRates: {},
};

const allocationMethodSlice = createSlice({
  name: "allocationMethod",
  initialState,
  reducers: {
    setAllocationMethod: (state, action) => {
      let { id, label } = action.payload;
      state.selectedMethodDetail = action.payload;
      state.selectedMethod = label;
      let key = id ? headerMapping[Number(id) - 1] : [];
      state.headers = allocationHeaders[key];
    },
    updateAllocationRates: (state, action) => {
      state.allocationRates = { ...state.allocationRates, ...action.payload };
    },
  },
});

export const { setAllocationMethod, updateAllocationRates } =
  allocationMethodSlice.actions;
export default allocationMethodSlice.reducer;
