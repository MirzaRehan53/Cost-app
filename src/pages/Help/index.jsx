import React, { useState } from "react";
import HelpImg from "../../assets/help.jpg";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";

function App() {
  const [openFaq, setOpenFaq] = useState(0);

  const costTypes = [
    {
      title: "Fixed Cost",
      description:
        "Fixed cost refers to a type of business expense that remains constant regardless of the level of production or sales. These costs do not change with the movement of goods or services a company produces within a specific time frame.",
    },
    {
      title: "Variable Cost",
      description:
        "Variable cost refers to expenses that change directly in proportion to the level of production or sales activity. In simpler terms, these are costs that increase or decrease depending on how much you produce or sell.",
    },
    {
      title: "Direct Cost",
      description:
        "Direct costs are expenses that can be directly traced to a specific product, service, or project. These costs are directly associated with the production or delivery of a particular item and vary based on the level of activity.",
    },
    {
      title: "Indirect Cost",
      description:
        "Indirect costs are expenses that are not directly tied to a specific product or activity but are necessary for the overall functioning of a business. These costs may serve multiple products or departments and cannot be easily traced to a single cost object.",
    },
    {
      title: "Purchase Quantity",
      description:
        "Purchase quantity refers to the number of units of a product or item that a buyer orders or acquires in a single transaction. It indicates the total amount being procured and is often determined based on the buyer's needs, budget, or the terms of a purchase agreement.",
    },
    {
      title: "Input Quantity",
      description:
        "Input quantity refers to the specific amount or number of items, units, or resources that enter entire's into a system, tool, or calculator for further processing or calculation.",
    },
  ];

  const allocationMethods = [
    {
      number: "1.",
      title: "Traditional overhead rate method",
      description: "Allocates overhead costs using single cost driver.",
    },
    {
      number: "2.",
      title: "Allocate overhead costs using single cost driver",
      description: "Allocates overhead costs using single cost driver.",
    },
    {
      number: "3.",
      title: "Activity-Based Costing (ABC)",
      description: "Allocates overhead costs using single cost driver.",
    },
    {
      number: "4.",
      title: "Allocation Based on Direct Labor Costs",
      description: "Allocates overhead costs using single cost driver.",
    },
    {
      number: "5.",
      title: "Allocation Based on Machine Hours",
      description: "Allocates overhead costs using single cost driver.",
    },
    {
      number: "6.",
      title: "Allocation Based on Units produced",
      description: "Allocates overhead costs using single cost driver.",
    },
    {
      number: "7.",
      title: "Allocation Based on Sales Revenue",
      description: "Allocates overhead costs using single cost driver.",
    },
    {
      number: "8.",
      title: "Allocation Based on Direct Material Costs",
      description: "Allocates overhead costs using single cost driver.",
    },
    {
      number: "9.",
      title: "Allocation Based on Floor Space (Square Footage)",
      description: "Allocates overhead costs using single cost driver.",
    },
    {
      number: "10.",
      title: "Reciprocal Method (for Service Departments)",
      description: "Allocates overhead costs using single cost driver.",
    },
  ];

  const faqs = [
    {
      question: "What is a cost calculator?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Who can use this cost calculator?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "How do I use the cost calculator?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "Can I save my calculations?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "Can I calculate costs for multiple items?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "How accurate are the results?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  return (
    <div className="min-h-screen px-20">
      {/* Hero Section */}
      <div className="relative flex flex-col gap-10 mt-20">
        <div>
          <img
            src={HelpImg}
            alt="Customer service team"
            className="w-full object-cover rounded-[50px]"
          />
        </div>

        <div className="flex items-center justify-center text-black">
          <div className="text-center ">
            <h1 className="text-4xl font-bold mb-4">Need help?</h1>
            <p className="text-lg text-darkBlue">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>

      {/* Cost Types Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {costTypes.map((type, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">{type.title}</h3>
              <p className="text-darkBlue">{type.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Allocation Methods Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Indirect Cost Allocation Methods
          </h2>
          <div className="flex items-center justify-center">
            <p className="text-center text-darkBlue w-[80%] mb-12 ">
              Allocating indirect costs, or overheads, is vital for accurate
              product costing and pricing. It ensures proper expense
              distribution for informed profitability analysis and business
              decisions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allocationMethods.map((method, index) => (
              <div
                key={method.number}
                className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                  index >= 9 ? "lg:col-start-2" : ""
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-2 mb-3">
                    <span className="font-semibold text-gray-900">
                      {method.number}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {method.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 py-16 h-dvh">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">FAQ'S</h2>
          <p className="text-darkBlue">
            The most common questions we get asked
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden divide-y divide-gray-100">
          {faqs.map((faq, index) => (
            <div key={index} className="grid">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span className="font-semibold text-gray-900">
                  {faq.question}
                </span>
                <span className="relative w-6 h-6 flex items-center justify-center">
                  <span
                    className={`absolute w-0.5 h-4 bg-gray-500 transition-transform duration-300 ${
                      openFaq === index ? "rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute w-4 h-0.5 bg-gray-500 transition-transform duration-300 ${
                      openFaq === index ? "rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                  openFaq === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50">
                    <p className="text-darkBlue">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Button */}
      <div className="fixed bottom-8 right-8">
        <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default App;
