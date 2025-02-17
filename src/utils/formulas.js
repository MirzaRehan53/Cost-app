//DIRECT COSTS FORMULAS

export const calculateCostPerInputQuantity = (
  purchaseUnitCost,
  dcPurchaseUnit,
  inputQuantityPerUnit
) => {
  try {
    if (!purchaseUnitCost || !dcPurchaseUnit || !inputQuantityPerUnit) return 0;
    const result =
      (Number(purchaseUnitCost) * Number(dcPurchaseUnit)) /
      Number(inputQuantityPerUnit);
    return isFinite(result) ? result : 0;
  } catch (error) {
    console.error("Error calculating cost per input quantity:", error);
    return 0;
  }
};

export const calculateSubtotalCost = (
  costPerInputQuantity,
  totalQuantityMeasure
) => {
  try {
    if (!costPerInputQuantity || !totalQuantityMeasure) return 0;
    const result = Number(costPerInputQuantity) * Number(totalQuantityMeasure);
    return isFinite(result) ? result : 0;
  } catch (error) {
    console.error("Error calculating subtotal cost:", error);
    return 0;
  }
};

//INDIRECT COST FORMULAS
export const calculateTotalLaborHours = (unitsProduced, laborHoursPerUnit) => {
  const units = Number(unitsProduced) || 0;
  const hours = Number(laborHoursPerUnit) || 0;
  return units * hours;
};

export const calculateOverheadAllocated = (totalLaborHours, overheadRate) => {
  const hours = Number(totalLaborHours) || 0;
  const rate = Number(overheadRate) || 0;
  return hours * rate;
};

export const calculateTotalDirectCosts = (unitsProduced, directCostPerUnit) => {
  const units = Number(unitsProduced) || 0;
  const cost = Number(directCostPerUnit) || 0;
  return units * cost;
};

export const calculateTotalCostPerProduct = (
  totalDirectCosts,
  overheadAllocated
) => {
  const direct = Number(totalDirectCosts) || 0;
  const overhead = Number(overheadAllocated) || 0;
  return direct + overhead;
};

export const calculateCostPerUnit = (totalCostPerProduct, unitsProduced) => {
  const total = Number(totalCostPerProduct) || 0;
  const units = Number(unitsProduced) || 0;
  return units ? total / units : 0;
};
