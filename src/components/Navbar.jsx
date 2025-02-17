import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutModal from "../components/LogoutModal";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <nav className=" text-customBlack bg-transparent w-full fixed top-0 left-0 z-50">
      <div className="w-full md:px-[80px] sm:px-[40px] px-10">
        <div className="flex flex-row justify-between items-center h-16">
          <div className="flex-shrink-0">
            <NavLink to={"/"} className="">
              Logo
            </NavLink>
          </div>

          <div className="hidden md:flex space-x-6">
            <NavLink
              to="pricing"
              className="hover:text-gray-400 font-semibold leading-[30px]"
            >
              Pricing
            </NavLink>
            <NavLink
              to="contact"
              className="hover:text-gray-400 font-semibold leading-[30px]"
            >
              Contact
            </NavLink>
            <NavLink
              to="help"
              className="hover:text-gray-400 font-semibold leading-[30px]"
            >
              Help
            </NavLink>
            <NavLink
              to="about"
              className="hover:text-gray-400 font-semibold leading-[30px]"
            >
              About Us
            </NavLink>
            <div className="flex flex-row gap-2 items-center justify-center">
              <NavLink
                to="login"
                className="hover:text-gray-400 font-semibold leading-[30px]"
              >
                <button className="border border-[#606F83] rounded-[5px] hover:bg-skyBlue hover:text-white   text-center text-[#0C0E11] text-xs w-[70px] h-[30px] px-2">
                  Login
                </button>
              </NavLink>
              <NavLink
                to="signup"
                className="border border-[#606F83] rounded-[5px] hover:bg-skyBlue bg-darkBlue text-white flex items-center justify-center text-center  text-xs w-[70px] h-[30px] px-2"
              >
                Sign up
              </NavLink>
              {/* <button
                className="border border-[#606F83] rounded-[5px] hover:bg-skyBlue bg-darkBlue text-white text-center  text-xs w-[70px] h-[30px] px-2"
                onClick={() => setShowModal(true)}
              >
                Logout
              </button> */}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <a href="#pricing" className="block px-4 py-2 hover:bg-gray-700">
            Pricing
          </a>
          <a href="#contact" className="block px-4 py-2 hover:bg-gray-700">
            Contact
          </a>
          <a href="#help" className="block px-4 py-2 hover:bg-gray-700">
            Help
          </a>
          <a href="#about-us" className="block px-4 py-2 hover:bg-gray-700">
            About Us
          </a>
          <a href="#login" className="block px-4 py-2 hover:bg-gray-700">
            Login/Signup
          </a>
        </div>
      )}
      <div>
        {showModal && (
          <LogoutModal setShowModal={setShowModal} showModal={showModal} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
