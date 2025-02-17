import React from "react";
import Oopsie from "../../assets/Oopsie.svg";
import { Link } from "react-router-dom";
const index = () => {
  return (
    <div className="min-h-screen h-dvh w-full">
      <div className="flex flex-col gap-5 w-full h-full justify-center items-center text-center">
        <div>
          <img src={Oopsie} alt="" />
        </div>
        <div className="font-normal  tracking-[2%] text-[#0C0E1199] w-[350px] text-[18px] leading-[25px]">
          The page you are looking for doesn't exist or has been moved.
        </div>
        <Link to={"/"}>
          <button
            type="submit"
            className=" px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default index;
