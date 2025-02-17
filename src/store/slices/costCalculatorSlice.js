// src/store/slices/costCalculatorSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";

const initialState = {
  currentStep: 1,
  productInfo: {
    productName: "",
    productType: "",
  },
  directCosts: [
    {
      dcPurchaseUnit: 1,
      inputQuantityPerUnit: 1000,
      dcPurchaseUnitMeasure: "Pieces",
      totalQuantityMeasure: 100,
      dcType: "Variable",
      inputQuantityMeasure: "Kilograms",
      category: "Raw Materials",
      purchaseUnitCost: 10,
      directCostName: "sdsd",
      id: "kbz9lhcr",
    },
  ],
  selectedAllocationMethod: null,
  indirectCosts: [
    {
      overheadRate: 231,
      directCostPerUnit: 23,
      laborHoursPerUnit: 123,
      unitsProduced: 12,
      productName: "asd",
      totalCostDriverUnits: 22,
      costDriver: 12,
      totalIndirectCosts: 231,
      id: "t5ih18qv",
    },
  ],
  allCosts: [],
  progress: {
    lastSavedStep: 1,
    lastUpdated: null,
  },
  loading: false,
  error: null,
};

export const saveProgress = createAsyncThunk(
  "costCalculator/saveProgress",
  async (data) => {
    const response = await api.post("/progress/save", data);
    return response.data;
  }
);

export const loadProgress = createAsyncThunk(
  "costCalculator/loadProgress",
  async () => {
    const response = await api.get("/progress/load");
    return response.data;
  }
);

const costCalculatorSlice = createSlice({
  name: "costCalculator",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateProductInfo: (state, action) => {
      console.log(state, action.payload);
      state.productInfo = { ...state.productInfo, ...action.payload };
    },
    addDirectCost: (state, action) => {
      state.directCosts.push(action.payload);
    },
    updateDirectCost: (state, action) => {
      const { index, data } = action.payload;
      state.directCosts[index] = { ...state.directCosts[index], ...data };
    },
    removeDirectCost: (state, action) => {
      state.directCosts = state.directCosts.filter(
        (_, index) => index !== action.payload
      );
    },
    removeMultipleDirectCosts: (state, action) => {
      const indexesToRemove = action.payload;
      state.directCosts = state.directCosts.filter(
        (_, index) => !indexesToRemove.includes(index)
      );
    },
    addIndirectCost: (state, action) => {
      state.indirectCosts.push(action.payload);
    },
    updateIndirectCost: (state, action) => {
      const { index, data } = action.payload;
      state.indirectCosts[index] = { ...state.indirectCosts[index], ...data };
    },
    removeIndirectCost: (state, action) => {
      state.indirectCosts = state.indirectCosts.filter(
        (_, index) => index !== action.payload
      );
    },
    removeMultipleIndirectCosts: (state, action) => {
      const indexesToRemove = action.payload;
      state.indirectCosts = state.indirectCosts.filter(
        (_, index) => !indexesToRemove.includes(index)
      );
    },

    // setAllocationMethod: (state, action) => {
    //   state.selectedAllocationMethod = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveProgress.fulfilled, (state, action) => {
        state.progress = {
          lastSavedStep: state.currentStep,
          lastUpdated: new Date().toISOString(),
        };
      })
      .addCase(loadProgress.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      });
  },
});

export const {
  setCurrentStep,
  updateProductInfo,
  addDirectCost,
  updateDirectCost,
  removeDirectCost,
  addIndirectCost,
  removeIndirectCost,
  removeMultipleIndirectCosts,
  removeMultipleDirectCosts,
  // setAllocationMethod,
  updateIndirectCost,
} = costCalculatorSlice.actions;

export default costCalculatorSlice.reducer;
