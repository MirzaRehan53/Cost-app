import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
} from "lucide-react";
import {
  calculateCostPerInputQuantity,
  calculateCostPerUnit,
  calculateOverheadAllocated,
  calculateSubtotalCost,
  calculateTotalCostPerProduct,
  calculateTotalDirectCosts,
  calculateTotalLaborHours,
} from "../utils/formulas";

const CATEGORIES = ["Raw Materials", "Packaging", "Labor", "Other"];

const DC_TYPES = ["Variable", "Fixed"];

const UNIT_MEASURES = [
  "Pieces",
  "Kilograms",
  "Grams",
  "Liters",
  "Hours",
  "Meters",
  "Units",
];

const CustomTooltip = ({
  children,
  isVisible,
  selectedCount,
  onEdit,
  onDelete,
  onClose,
}) => {
  if (!isVisible) return children;

  return (
    <div className="relative">
      {children}
      <div className="absolute z-50 left-0 top-full bg-white border rounded-lg shadow-lg py-1 px-2">
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-100 rounded" onClick={onEdit}>
            <Edit2 className="w-4 h-4 text-blue-600" />
          </button>

          <button className="p-1 hover:bg-gray-100 rounded" onClick={onClose}>
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomTable = ({
  itemsPerPage = 5,
  values = [],
  headers = [],
  headerText = "",
  onUpdateData,
  onDeleteData,
  onDeleteMultiple,
}) => {
  console.log(values, "valuesss");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState(new Set());

  const getEditorType = (header) => {
    switch (header.key) {
      case "category":
        return "dropdown-category";
      case "dcType":
        return "dropdown-dcType";
      case "dcPurchaseUnitMeasure":
      case "inputQuantityMeasure":
        return "dropdown-unit";
      case "dcPurchaseUnit":
      case "purchaseUnitCost":
      case "inputQuantityPerUnit":
      case "totalQuantityMeasure":
      case "directCostPerUnit":
      case "laborHoursPerUnit":
      case "overheadRate":
      case "unitsProduced":
        return "number";
      default:
        return "text";
    }
  };

  const getDropdownOptions = (editorType) => {
    switch (editorType) {
      case "dropdown-category":
        return CATEGORIES;
      case "dropdown-dcType":
        return DC_TYPES;
      case "dropdown-unit":
        return UNIT_MEASURES;
      default:
        return [];
    }
  };

  const validateInput = (value, editorType) => {
    if (editorType === "number") {
      const numValue = Number(value);
      return !isNaN(numValue) && numValue >= 0;
    }
    return true;
  };

  // Calculate cell value based on formulas
  const calculateCellValue = (row, header) => {
    try {
      if (!row || !header?.key) return "";

      switch (header.key) {
        case "totalLaborHours":
          return calculateTotalLaborHours(
            row.unitsProduced,
            row.laborHoursPerUnit
          );

        case "overheadAllocated":
          const totalLaborHours = calculateTotalLaborHours(
            row.unitsProduced,
            row.laborHoursPerUnit
          );
          return calculateOverheadAllocated(totalLaborHours, row.overheadRate);

        case "totalDirectCosts":
          return calculateTotalDirectCosts(
            row.unitsProduced,
            row.directCostPerUnit
          );

        case "totalCostPerProduct":
          const directCosts = calculateTotalDirectCosts(
            row.unitsProduced,
            row.directCostPerUnit
          );
          const laborHours = calculateTotalLaborHours(
            row.unitsProduced,
            row.laborHoursPerUnit
          );
          const overhead = calculateOverheadAllocated(
            laborHours,
            row.overheadRate
          );
          return calculateTotalCostPerProduct(directCosts, overhead);

        case "costPerUnit":
          const totalCost = calculateTotalCostPerProduct(
            calculateTotalDirectCosts(row.unitsProduced, row.directCostPerUnit),
            calculateOverheadAllocated(
              calculateTotalLaborHours(
                row.unitsProduced,
                row.laborHoursPerUnit
              ),
              row.overheadRate
            )
          );
          return calculateCostPerUnit(totalCost, row.unitsProduced);

        // Handle other existing calculated fields if any
        case "costPerInputQuantity":
          return calculateCostPerInputQuantity(
            row?.purchaseUnitCost,
            row?.dcPurchaseUnit,
            row?.inputQuantityPerUnit
          );

        case "subtotalCost":
          const costPerInput = calculateCostPerInputQuantity(
            row?.purchaseUnitCost,
            row?.dcPurchaseUnit,
            row?.inputQuantityPerUnit
          );
          return calculateSubtotalCost(costPerInput, row?.totalQuantityMeasure);

        // Return the raw value for non-calculated fields
        default:
          return row[header.key] ?? "";
      }
    } catch (error) {
      console.error(`Error calculating value for ${header?.key}:`, error);
      return "";
    }
  };

  const filteredData = useMemo(() => {
    try {
      return values?.filter((row) => {
        if (!row) return false;

        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          const matchesSearch = Object.values(row).some((value) =>
            String(value ?? "")
              .toLowerCase()
              .includes(searchLower)
          );
          if (!matchesSearch) return false;
        }

        return Object.entries(filters).every(([key, value]) => {
          if (!value) return true;
          return String(row[key] ?? "")
            .toLowerCase()
            .includes(value.toLowerCase());
        });
      });
    } catch (error) {
      console.error("Error filtering data:", error);
      return [];
    }
  }, [values, filters, searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil((filteredData?.length ?? 0) / itemsPerPage)
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData =
    filteredData?.slice(startIndex, startIndex + itemsPerPage) ?? [];

  const handleEditCell = (rowIndex, key, value) => {
    setEditingCell({ rowIndex, key });
    setEditValue(String(value ?? ""));
  };

  const handleSaveCell = (value) => {
    try {
      if (!editingCell) return;

      const { rowIndex, key } = editingCell;
      const header = headers?.find((h) => h.key === key);
      const editorType = getEditorType(header);
      let finalValue = value;

      if (editorType === "number") {
        finalValue = Number(value) || 0;
      }

      // Log the filtered data and values for debugging
      console.log("Filtered Data:", filteredData);
      console.log("Values:", values);

      const originalIndex = values?.findIndex(
        (item) => item === filteredData?.[rowIndex]
      );

      // Log the original index for debugging
      console.log("Original Index:", originalIndex);

      if (originalIndex !== -1) {
        onUpdateData?.(originalIndex, {
          [key]: finalValue,
        });
      } else {
        console.error("Original index not found for the row.");
      }

      setEditingCell(null);
      setEditValue("");
    } catch (error) {
      console.error("Error saving cell:", error);
    }
  };

  const handleDeleteRow = (rowIndex) => {
    try {
      const originalIndex = values?.findIndex(
        (item) => item === filteredData?.[rowIndex]
      );
      if (originalIndex !== -1) {
        onDeleteData?.(originalIndex);
        setSelectedRows((prev) => {
          const newSet = new Set(prev);
          newSet.delete(rowIndex);
          return newSet;
        });
      }
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  const formatNumber = (value, type) => {
    try {
      if (value === undefined || value === null || value === "") return "";

      if (type === "number") {
        return new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value);
      }
      return String(value);
    } catch (error) {
      console.error("Error formatting number:", error);
      return "";
    }
  };

  const handleRowSelect = (rowIndex) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowIndex)) {
        newSet.delete(rowIndex);
      } else {
        newSet.add(rowIndex);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData?.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(
        new Set(paginatedData?.map((_, index) => startIndex + index))
      );
    }
  };

  const handleDeleteSelected = () => {
    try {
      if (selectedRows.size === 0) return;

      const indexesToDelete = Array.from(selectedRows)
        .map((rowIndex) =>
          values?.findIndex((item) => item === filteredData?.[rowIndex])
        )
        .filter((index) => index !== -1)
        .sort((a, b) => b - a);

      onDeleteMultiple?.(indexesToDelete);
      setSelectedRows(new Set());
    } catch (error) {
      console.error("Error deleting selected rows:", error);
    }
  };

  const calculateTotal = (key) => {
    try {
      if (headers?.find((h) => h.key === key)?.type === "number") {
        return (
          filteredData?.reduce((sum, row) => {
            const value = calculateCellValue(row, { key });
            return sum + (Number(value) || 0);
          }, 0) ?? 0
        );
      }
      return null;
    } catch (error) {
      console.error("Error calculating total:", error);
      return 0;
    }
  };

  const CellEditor = ({ header, value, onSave, onCancel }) => {
    const editorType = getEditorType(header);
    const [localValue, setLocalValue] = useState(value);

    const handleChange = (e) => {
      const newValue = e.target.value;
      if (validateInput(newValue, editorType)) {
        setLocalValue(newValue);
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onSave(localValue);
      } else if (e.key === "Escape") {
        onCancel();
      }
    };

    if (editorType.startsWith("dropdown")) {
      const options = getDropdownOptions(editorType);
      return (
        <div className="flex items-center gap-2">
          <select
            value={localValue}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            autoFocus
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            onClick={() => onSave(localValue)}
            className="p-1 text-green-600 hover:text-green-900"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={onCancel}
            className="p-1 text-red-600 hover:text-red-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <input
          type={editorType === "number" ? "number" : "text"}
          value={localValue}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          autoFocus
          min={editorType === "number" ? "0" : undefined}
          step={editorType === "number" ? "any" : undefined}
        />
        <button
          onClick={() => onSave(localValue)}
          className="p-1 text-green-600 hover:text-green-900"
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          onClick={onCancel}
          className="p-1 text-red-600 hover:text-red-900"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  };

  const CellContent = ({ rowIndex, header, row }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const value = calculateCellValue(row, header);

    return (
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {editingCell?.rowIndex === rowIndex &&
        editingCell?.key === header?.key ? (
          <CellEditor
            header={header}
            value={editValue}
            onSave={handleSaveCell}
            onCancel={() => {
              setEditingCell(null);
              setEditValue("");
            }}
          />
        ) : (
          <CustomTooltip
            isVisible={showTooltip}
            selectedCount={selectedRows?.size ?? 0}
            onEdit={() => handleEditCell(rowIndex, header?.key, value)}
            onDelete={() => handleDeleteRow(rowIndex)}
            onClose={() => setShowTooltip(false)}
          >
            <div className="w-full text-sm text-left">
              {header?.type === "number"
                ? formatNumber(value, header.type)
                : value}
            </div>
          </CustomTooltip>
        )}
      </div>
    );
  };

  return (
    <div className="w-full space-y-2 mt-2">
      <div className="flex flex-row items-center gap-3">
        <div className="text-[18px] font-semibold">{headerText}</div>
        <div className="flex items-center gap-2 px-2 py-2 rounded-lg">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 py-1 w-[200px] border-skyBlue border text-sm focus:outline focus:outline-darkBlue placeholder:text-xs rounded-lg"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border min-h-[250px] border-gray-200 shadow-sm bg-white">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-skyBlue bg-opacity-40">
            <tr className="divide-x divide-gray-200">
              <th className="px-6 text-left text-sm font-medium text-gray-500 tracking-wider">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 w-max">
                    <input
                      type="checkbox"
                      checked={
                        selectedRows.size === paginatedData?.length &&
                        paginatedData?.length > 0
                      }
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs">Select All</span>
                  </div>
                  {selectedRows.size > 0 && (
                    <button
                      onClick={handleDeleteSelected}
                      className="p-1 hover:bg-gray-200 rounded-full"
                      title="Delete selected"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  )}
                </div>
              </th>
              {headers?.map((header, index) => (
                <th
                  key={index}
                  className="px-6 text-left py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="space-y-2 min-w-[150px]">
                    <div className="text-xs">
                      {header?.label ? header?.label : header}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData?.map((row, rowIndex) => (
              <tr
                key={row?.id ?? rowIndex}
                className="hover:bg-gray-50 divide-x divide-gray-200"
              >
                <td className="px-6 py-2 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedRows?.has(startIndex + rowIndex)}
                    onChange={() => handleRowSelect(startIndex + rowIndex)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                {headers?.map((header) => (
                  <td key={header?.key} className="px-6 whitespace-nowrap">
                    <>{console.log(header)}</>
                    <CellContent
                      rowIndex={rowIndex}
                      header={header}
                      row={row}
                    />
                  </td>
                ))}
              </tr>
            ))}
            {paginatedData?.length === 0 && (
              <tr>
                <td
                  colSpan={headers?.length + 1}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-2 bg-white border rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-700">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} entries
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1 rounded-md border enabled:hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-[22px] h-[22px] text-xs rounded-md ${
                currentPage === page
                  ? "border border-darkBlue text-black"
                  : "border hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-1 rounded-md border enabled:hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
