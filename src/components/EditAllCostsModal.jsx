import React from "react";
import CustomTable from "./CustomTable";

const EditAllCostsModal = ({ setShowModal }) => {
  return (
    <div className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="  relative z-50 rounded-lg shadow-lg p-6"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #CED2D6 124.35%)",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Costs</h2>
          <button className="text-sm border px-3 py-1 cursor-pointer rounded-md hover:bg-slate-400 hover:text-white border-skyBlue">
            Add new slot
          </button>
        </div>

        {/* Replace CustomTable for debugging */}
        <div className="max-w-6xl ">
          <CustomTable />
        </div>

        <div className="flex justify-between pt-3">
          <button
            className="border hover:bg-skyBlue border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold"
            onClick={() => setShowModal(false)}
          >
            Back
          </button>
          <button
            className="border bg-darkBlue text-white border-skyBlue w-[80px] h-[30px] rounded-md text-sm font-semibold"
            onClick={() => setShowModal(false)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAllCostsModal;
