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
