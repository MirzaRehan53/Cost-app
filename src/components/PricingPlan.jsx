import React from "react";
import { Check } from "lucide-react";

const PricingCard = ({ title, price, features, buttonText, popular }) => {
  return (
    <div
      className={`w-[258px] rounded-[20px] h-[432px] p-6 relative ${
        popular ? "bg-slate-700 text-white" : "bg-white"
      } shadow-md`}
    >
      {popular && (
        <div className="absolute top-[10px] right-2 text-black bg-[#B2BCC8]  px-3 py-1 rounded-full text-xs">
          Popular
        </div>
      )}
      <div className="space-y-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold">${price}</span>
          <span className="text-sm text-gray-400">Per Month</span>
        </div>
        <div>
          <h3 className="text-xl font-medium">{title}</h3>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum dolor sit amet consectetur adipiscing elit
          </p>
        </div>
        <div className="pt-4 h-[194px]">
          <h4 className="mb-4 font-medium">What's Included?</h4>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <Check
                  size={20}
                  className={popular ? "text-white" : "text-slate-700"}
                />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center w-full h-full">
          <button
            className={` py-2 text-sm px-4 rounded-md transition-colors hover:bg-gray-400 bg-[#B2BCC8] text-black`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
export default PricingCard;
