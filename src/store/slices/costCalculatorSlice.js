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
      // subtotalCost: 123,
      // costPerInputQuantity: 123,
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
  indirectCosts: {
    costs: [],
    laborHours: {},
    overheadAllocated: {},
    totalDirectCosts: {},
    costPerUnit: {},
  },
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
    // setAllocationMethod: (state, action) => {
    //   state.selectedAllocationMethod = action.payload;
    // },
    updateIndirectCosts: (state, action) => {
      state.indirectCosts = { ...state.indirectCosts, ...action.payload };
    },
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
  removeMultipleDirectCosts,
  // setAllocationMethod,
  updateIndirectCosts,
} = costCalculatorSlice.actions;

export default costCalculatorSlice.reducer;
