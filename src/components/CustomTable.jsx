import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Edit2,
  Trash2,
  X,
  CheckSquare,
  Check,
} from "lucide-react";
import {
  calculateCostPerInputQuantity,
  calculateSubtotalCost,
} from "../utils/formulas";

// Utils functions for calculations

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
          <div className="flex items-center gap-1 px-2 py-1 border-r">
            <CheckSquare className="w-4 h-4 text-blue-600" />
            <span className="text-sm">{selectedCount} selected</span>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded" onClick={onEdit}>
            <Edit2 className="w-4 h-4 text-blue-600" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded" onClick={onDelete}>
            <Trash2 className="w-4 h-4 text-red-600" />
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
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Calculate cell value based on formulas
  const calculateCellValue = (row, header) => {
    try {
      if (!row || !header?.key) return "";

      switch (header.key) {
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

  const handleSaveCell = () => {
    try {
      if (!editingCell) return;

      const { rowIndex, key } = editingCell;
      const header = headers?.find((h) => h.key === key);
      const value =
        header?.type === "number" ? Number(editValue) || 0 : editValue;

      const originalIndex = values?.findIndex(
        (item) => item === filteredData?.[rowIndex]
      );

      if (originalIndex !== -1) {
        onUpdateData?.(originalIndex, {
          [key]: value,
        });
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveCell();
    } else if (e.key === "Escape") {
      setEditingCell(null);
      setEditValue("");
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

  const CellContent = ({ rowIndex, header, row }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const value = calculateCellValue(row, header);

    return (
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
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
                    <div className="text-xs">{header?.label}</div>
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
                    {editingCell?.rowIndex === rowIndex &&
                    editingCell?.key === header?.key ? (
                      <div className="flex items-center gap-2">
                        <input
                          type={header?.type}
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={handleKeyPress}
                          className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          autoFocus
                        />
                        <button
                          onClick={handleSaveCell}
                          className="p-1 text-green-600 hover:text-green-900"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingCell(null);
                            setEditValue("");
                          }}
                          className="p-1 text-red-600 hover:text-red-900"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <CellContent
                        rowIndex={rowIndex}
                        header={header}
                        row={row}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
            <tr className="divide-x divide-gray-200">
              <td className="px-6 py-2 text-sm font-semibold">Total</td>
              {headers?.map((header) => (
                <td
                  key={header?.key}
                  className="px-6 py-2 text-sm font-semibold"
                >
                  {header?.type === "number"
                    ? formatNumber(calculateTotal(header?.key), "number")
                    : ""}
                </td>
              ))}
            </tr>
          </tfoot> */}
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
            className="rounded-md border enabled:hover:bg-gray-50 disabled:opacity-50"
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
            className="rounded-md border enabled:hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
