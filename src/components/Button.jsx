import React from "react";
const Button = ({ className, onClick, children, type }) => {
  return (
    <>
      <button
        className={`${className} w-[143px] hover:ring-1 hover:ring-inset hover:bg-skyBlue bg-darkBlue h-[40px]  text-[16px] rounded-[10px] font-semibold leading-[30px] text-center text-white `}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
