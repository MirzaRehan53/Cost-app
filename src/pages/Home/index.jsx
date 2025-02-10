import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import HomeHeroImg from "../../assets/homehero.jpg";
import TableImg from "../../assets/tableImg.jpg";
import ThirdImg from "../../assets/thirdImg.png";
import alertIcon from "../../assets/alert.svg";
import chartIcon from "../../assets/chart.svg";
import hourGlassIcon from "../../assets/hourGlass.svg";
import processBg from "../../assets/process.jpg";
import gsap from "gsap";

function HomePage() {
  const processSteps = [
    {
      id: 1,
      title: "Enter Your Data",
      content: [
        "Fill in the required fields, such as:",
        "• Quantity",
        "• Unit price",
        "• Tax rate (if applicable)",
        "• Discounts or additional costs",
      ],
    },
    {
      id: 2,
      title: "Review Information",
      content: ["Verify all entered information for accuracy"],
    },
    {
      id: 3,
      title: "Calculate Totals",
      content: ["System automatically calculates all costs and fees"],
    },
    {
      id: 4,
      title: "Generate Report",
      content: ["Create detailed cost breakdown and summary"],
    },
    {
      id: 5,
      title: "Save & Export",
      content: ["Save your calculations and export in desired format"],
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const [isProcessVisible, setIsProcessVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const introRef = useRef(null);
  const processRef = useRef(null);
  const titleRef = useRef(null);
  const stepsRef = useRef([]);
  const contentRef = useRef(null);
  const processTitleRef = useRef(null);

  useEffect(() => {
    if (isIntroVisible && titleRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        introRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power3.out" }
      );

      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
        "-=0.5"
      );
    }
  }, [isIntroVisible]);

  useEffect(() => {
    if (isProcessVisible && processTitleRef.current) {
      gsap.fromTo(
        processTitleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
      );
    }
  }, [isProcessVisible]);

  const startProcess = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsIntroVisible(false);
        setIsProcessVisible(true);
        setIsAnimating(false);
      },
    });

    if (titleRef.current && introRef.current) {
      tl.to(titleRef.current, { y: -100, opacity: 0, duration: 1 }).to(
        introRef.current,
        { opacity: 0, duration: 0.5 },
        "-=0.5"
      );
    }
  };

  const resetToIntro = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (processRef.current) {
      gsap.to(processRef.current, {
        opacity: 0,
        y: -100,
        duration: 1,
        onComplete: () => {
          setIsProcessVisible(false);
          setIsIntroVisible(true);
          setCurrentStep(0);
          setIsAnimating(false);
        },
      });
    }
  };

  const goToStep = (stepIndex) => {
    if (isAnimating) return;
    setCurrentStep(stepIndex);

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
          gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.3 });
        },
      });
    }
  };

  useEffect(() => {
    let interval;
    if (isProcessVisible) {
      interval = setInterval(() => {
        if (currentStep < processSteps.length - 1) {
          goToStep(currentStep + 1);
        } else {
          clearInterval(interval);
          setTimeout(resetToIntro, 2000);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [currentStep, isProcessVisible]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen ">
        <div className="absolute inset-0">
          <img
            src={HomeHeroImg}
            alt="Background"
            className="w-full h-full mt-[65px] "
          />
        </div>
        <div className="relative h-full -top-16 flex items-center justify-center flex-col  text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Cost Calculator
          </h1>
          <p className="text-base text-white mb-8 max-w-2xl mx-auto">
            Cost Calculator is designed to help you process the cost data
            properly which individual element to customize the total cost of
            product.
          </p>
          <NavLink to={"cost"}>
            <button className="bg-white border hover:bg-gray-200  border-skyBlue text-darkBlue  px-8 py-3 rounded-[20px] font-semibold">
              Start Free Trial
            </button>
          </NavLink>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 bg-gray-100 h-[80dvh]">
        <div className="max-w-5xl mx-auto ">
          <img
            src={TableImg}
            alt=""
            className="absolute max-w-5xl mx-auto top-[60%] rounded-[20px]"
          />
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-20 relative bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-semibold mb-6">
                <span className="text-darkBlue text-base font-normal  tracking-[2%]">
                  OUR PURPOSE
                </span>
                <br />
                Simplifying
                <br />
                Calculations
              </h2>
              <p className="text-darkBlue text-base font-normal  tracking-[2%] mb-8">
                Making complex cost calculations easy for users by automating
                the process.
              </p>
              <button className="text-blue-600 font-semibold flex items-center gap-2">
                Explore <span className="text-xl">→</span>
              </button>
            </div>
            <div>
              <img
                src={ThirdImg}
                alt="Calculator and notebook"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-100 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Services Solve Any
            <br />
            Business Problem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: chartIcon,
                title: "Understanding Profit Margins",
                description:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.",
              },
              {
                icon: hourGlassIcon,
                title: "Time-Consuming Calculations",
                description:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.",
              },
              {
                icon: alertIcon,
                title: "Inaccurate Data or Inputs",
                description:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.",
              },
            ].map((service, index) => (
              <div
                className="bg-[#F5F5F5] h-[400px] flex flex-col items-center justify-center rounded-[10px] border border-[#E0E0E0] shadow-lg p-6"
                key={index}
              >
                <div className="flex flex-col gap-10 items-center mb-4">
                  <img src={service.icon} alt="" />
                  <h2 className="text-lg font-semibold text-[#212121]">
                    {service.title}
                  </h2>
                </div>
                <p className="text-[#757575] mb-4">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative h-screen ">
        {isIntroVisible && (
          <div ref={introRef} className="relative h-full">
            <div className="absolute inset-0">
              <img
                src={processBg}
                alt="Background"
                className="w-full h-full  "
              />
            </div>
            <div className="relative h-full  flex items-center justify-center flex-col  text-center">
              <h1
                className="text-5xl font-semibold text-white mb-6"
                ref={titleRef}
              >
                Our Process
              </h1>
              <p className="text-base text-white mb-8 max-w-2xl mx-auto">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever took.
              </p>
              <button
                className="bg-white border transition-colors duration-300 hover:bg-darkBlue hover:text-white border-skyBlue text-darkBlue  px-8 py-3 rounded-[10px] font-semibold"
                onClick={startProcess}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {isProcessVisible && (
          <div
            ref={processRef}
            className="w-full flex flex-col items-center justify-between p-8"
          >
            <div className="flex flex-row items-center justify-center">
              <h2
                ref={processTitleRef}
                className="text-4xl txt w-full font-bold text-slate-800 mb-12 opacity-0" // Initially hidden
              >
                Our process
              </h2>
            </div>
            <div className="flex flex-row w-full items-center justify-center">
              <div className="w-1/2 flex justify-center">
                <div className="flex flex-col gap-8">
                  {processSteps.map((step, index) => (
                    <div
                      key={step.id}
                      ref={(el) => (stepsRef.current[index] = el)}
                      className={`flex items-center gap-4 cursor-pointer transition-all duration-300
                            ${
                              currentStep === index
                                ? "opacity-100 scale-105"
                                : "opacity-70"
                            }`}
                      onClick={() => goToStep(index)}
                    >
                      <div
                        className="w-12 h-12 bg-slate-600 text-white flex items-center justify-center
                                font-bold rounded-lg"
                      >
                        {step.id}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div ref={contentRef} className="w-1/2 pt-24">
                <h3 className="text-3xl font-bold text-slate-800 mb-6">
                  {processSteps[currentStep].title}
                </h3>
                <div className="space-y-4">
                  {processSteps[currentStep].content.map((text, index) => (
                    <p key={index} className="text-lg text-slate-600">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            What our satisfied customers have to say?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  This service transformed my business in two weeks.
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Name</p>
                    <p className="text-sm text-gray-500">Manager</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
