import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-600 text-white">
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Logo</h2>
            <p className="text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>

          <div className="flex flex-col justify-end items-end">
            <div>
              <h3 className="text-xl font-semibold mb-4">Product</h3>
              <ul className="space-y-2 ">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Contact us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col  items-end">
            <div>
              <h3 className="text-xl font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Calculation
                  </a>
                </li>
                <li className="">
                  <a href="#" className="hover:text-gray-300 ">
                    Solution
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col  items-end">
            <div>
              <h3 className="text-xl font-semibold mb-4 ">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to={"terms-and-conditions"}
                    className="hover:text-gray-300"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li className="">
                  <a href="#" className="hover:text-gray-300">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-500">
        <div className="container mx-auto px-8 py-6">
          <p className="text-center">
            Copyright@ 2024 Logo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
