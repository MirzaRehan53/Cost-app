import React from "react";
const Input = ({
  className,
  value,
  onChange,
  placeholder,
  onClick,
  type,
  readOnly = false,
}) => {
  return (
    <>
      <input
        className={`${className} min-w-full border-skyBlue border bg-transparent px-3 rounded-[5px] h-[40px] placeholder:text-darkBlue placeholder:text-[14px] font-medium`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onClick={onClick}
        type={type}
        readOnly={readOnly}
      />
    </>
  );
};

export default Input;
