import React from "react";
import PricingImg from "../../assets/pricing.jpg";
import PhoneIcon from "../../assets/phone.svg";
import EmailIcon from "../../assets/email.svg";
import PricingCard from "../../components/PricingPlan";
import PricingTable from "../../components/PricingPlansTable";
const PricingPage = () => {
  const plans = [
    {
      title: "Basic Plan",
      price: "0",
      features: [
        "Limited calculations (up to 5 per month)",
        "Basic input fields",
        "No saving/reporting options",
      ],
      buttonText: "Get Started",
    },
    {
      title: "Premium Plan",
      price: "9.99",
      features: [
        "Unlimited calculations",
        "Advanced input fields",
        "Save and export results",
        "Email support",
      ],
      buttonText: "Upgrade Now",
      popular: true,
    },
    {
      title: "Enterprise Plan",
      price: "145",
      features: [
        "All Pro features",
        "Multi-user access",
        "API Integration for businesses",
        "Priority support",
      ],
      buttonText: "Contact Sales",
    },
    {
      title: "Enterprise Plan",
      price: "145",
      features: [
        "All Pro features",
        "Multi-user access",
        "API Integration for businesses",
        "Priority support",
      ],
      buttonText: "Contact Sales",
    },
  ];
  return (
    <div className="w-full h-full px-20">
      <section className="SECTION-PRICING min-h-screen   ">
        <div className="flex flex-col justify-between gap-14 top-20 h-full relative ">
          <div className="h-1/2  w-full">
            <img src={PricingImg} alt="" className="rounded-[50px] w-full" />
          </div>
          <div className="h-1/2  flex items-center justify-center ">
            <div className="flex flex-col gap-3 items-center justify-center ">
              <div className="text-darkBlue font-semibold text-sm">
                BEST PRICING PLAN
              </div>
              <div className="text-[32px] leading-[32px] font-semibold tracking-[2%] text-center w-[80%]">
                Flexible Best Pricing Plan For You
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </section>
      <section className="h-max w-full py-16 flex items-center justify-center">
        <div className="flex flex-row flex-wrap gap-6  justify-center items-start">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </section>
      <section>
        <PricingTable />
      </section>
    </div>
  );
};

export default PricingPage;
