import React from "react";

const PricingTable = () => {
  const features = [
    {
      name: "Price",
      basic: "$0/month",
      premium: "$15/month",
      enterprise: "Custom Pricing",
    },
    {
      name: "Basic Calculations",
      basic: true,
      premium: true,
      enterprise: true,
    },
    {
      name: "Advanced Customization",
      basic: false,
      premium: true,
      enterprise: true,
    },
    {
      name: "Save/Export Results",
      basic: false,
      premium: true,
      enterprise: true,
    },
    {
      name: "Multi-Currency Support",
      basic: false,
      premium: true,
      enterprise: true,
    },
    {
      name: "Priority Support",
      basic: false,
      premium: false,
      enterprise: true,
    },
    {
      name: "Team Collaboration",
      basic: false,
      premium: false,
      enterprise: true,
    },
  ];

  const CheckIcon = () => (
    <svg
      className="w-5 h-5 text-green-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );

  const CrossIcon = () => (
    <svg
      className="w-5 h-5 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <div className=" p-6  ">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Compare Plans & Features
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="py-4 px-6 text-left text-black">Features</th>
              <th className="py-4 px-6 text-center text-black">Basic</th>
              <th className="py-4 px-6 text-center text-black">Premium</th>
              <th className="py-4 px-6 text-center text-black">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr
                key={feature.name}
                className={`border-b border-black border-opacity-20  `}
              >
                <td className="py-4 px-6 text-gray-800 font-medium">
                  {feature.name}
                </td>
                <td className="py-4 px-6 flex items-center justify-center w-full text-center">
                  {typeof feature.basic === "boolean" ? (
                    feature.basic ? (
                      <CheckIcon />
                    ) : (
                      <CrossIcon />
                    )
                  ) : (
                    <span className="text-gray-800">{feature.basic}</span>
                  )}
                </td>
                <td className="py-4 px-6  text-center">
                  {typeof feature.premium === "boolean" ? (
                    feature.premium ? (
                      <div className="flex items-center justify-center w-full">
                        <CheckIcon />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full">
                        <CrossIcon />
                      </div>
                    )
                  ) : (
                    <span className="text-gray-800">{feature.premium}</span>
                  )}
                </td>
                <td className="py-4 px-6 text-center">
                  {typeof feature.enterprise === "boolean" ? (
                    feature.enterprise ? (
                      <div className="flex items-center justify-center w-full">
                        <CheckIcon />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full">
                        <CrossIcon />
                      </div>
                    )
                  ) : (
                    <span className="text-gray-800">{feature.enterprise}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingTable;
