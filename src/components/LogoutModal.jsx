import React, { useState, useEffect } from "react";

const LogoutModal = ({ setShowModal, showModal }) => {
  const handleClose = () => {
    setTimeout(setShowModal(false), 200);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div
        className={`
           rounded-3xl shadow-xl w-full max-w-sm transform transition-all duration-300 ease-out
          ${showModal ? "opacity-100 scale-100" : "opacity-0 scale-0"}
        `}
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #CED2D6 124.35%)",
        }}
      >
        <div className="p-6 py-10 space-y-6">
          <h2 className="text-2xl font-semibold text-center">Are you sure?</h2>

          <p className="text-center text-gray-600">
            You will no longer be logged in on the selected devices.
          </p>

          <div className="flex gap-4 justify-center">
            <button className="border border-[#606F83] rounded-[5px] hover:bg-skyBlue bg-darkBlue text-white text-center  text-xs w-[70px] h-[30px] px-2">
              Log out
            </button>

            <button
              className="border border-[#606F83] rounded-[5px] hover:bg-darkBlue hover:text-white   text-center text-[#0C0E11] text-xs w-[70px] h-[30px] px-2"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
