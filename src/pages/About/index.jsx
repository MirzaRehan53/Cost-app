import React, { useState, useEffect } from "react";
import bgImg from "../../assets/bg-img.jpg";
import ProtectSvg from "../../assets/protect.svg";
import CloudSvg from "../../assets/cloud.svg";
import CalcImg from "../../assets/calc.png";
import Man from "../../assets/man.png";
import QuoteSvg from "../../assets/quote.svg";
const AboutPage = () => {
  const testimonials = [
    {
      name: "JOHN SMITH",
      role: "Founder of product",
      quote:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      image: Man,
    },
    {
      name: "EMMA WILSON",
      role: "Lead Developer",
      quote:
        "Our innovative approach to calculator design has revolutionized how people handle their financial planning. The positive feedback from our users continues to drive our passion for excellence.",
      image: Man,
    },
    {
      name: "MICHAEL CHEN",
      role: "Product Manager",
      quote:
        "What sets us apart is our dedication to user experience. Every feature we implement is thoroughly tested and refined based on real user feedback and needs.",
      image: Man,
    },
    {
      name: "SARAH JOHNSON",
      role: "UX Designer",
      quote:
        "The simplicity of our interface masks the powerful calculations happening behind the scenes. It's this balance of power and accessibility that makes our product special.",
      image: Man,
    },
    {
      name: "DAVID BROWN",
      role: "Technical Lead",
      quote:
        "Our commitment to constant improvement means we're always pushing the boundaries of what's possible while maintaining the reliability our users depend on.",
      image: Man,
    },
  ];

  const reasons = [
    {
      icon: <img src={ProtectSvg} alt="ProtectImg" className="h-16 w-16" />,
      title: "Crafted by Experts, Designed for Everyone",
      description:
        "Developed by a team of seasoned industry professionals, this tool combines expert knowledge with user-centric design. Rigorously tested and refined, it eliminates complexity, ensuring a seamless experience for users of all backgrounds.",
    },
    {
      icon: <img src={ProtectSvg} alt="ProtectImg" className="h-16 w-16" />,
      title: "Easy-to-use platform",
      description:
        "Our intuitive interface ensures a seamless experience, allowing users to navigate and calculate costs effortlessly. No technical expertise is needed—just straightforward tools designed to save you time and simplify your financial planning.",
    },
    {
      icon: <img src={CloudSvg} alt="ProtectImg" className="h-16 w-16" />,
      title: "Constant updates and New features in the work",
      description:
        "We are committed to continuous improvement, regularly updating the app with new features and enhancements based on user feedback and industry trends. Stay ahead with a tool that evolves to meet your changing needs.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen ">
      <section className="relative h-dvh  ">
        <div className="absolute h-full inset-0">
          <img
            src={bgImg}
            alt="Hero background - Business team with calculator"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative  h-full flex flex-col items-center justify-center text-darkBlue px-4">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl text-center leading-[80px] w-full font-bold mb-4">
              WHO WE ARE
            </h1>
            <p className="text-xl text-center max-w-2xl">
              Our mission is to empower businesses with expert cost
              determination and precise cost estimations, enabling them to make
              informed financial decisions, optimize profitability, and achieve
              sustainable growth.
            </p>
          </div>
        </div>
      </section>
      <div className="px-20">
        <section className="relative py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-darkBlue font-medium mb-2">OUR PURPOSE</div>
              <h2 className="text-3xl font-bold mb-6">
                Effortlessly Calculate Yours Costs with Our Innovative Web App
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our cost calculator website is designed to streamline the
                process of estimating costs for individuals and businesses.
                Whether you're managing a personal budget, planning a project,
                or running a business, this tool helps you make informed
                decisions with ease and accuracy.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg mt-1">•</span>
                  <p className="text-gray-600">
                    Provide a user-friendly platform to calculate costs without
                    any technical expertise.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg mt-1">•</span>
                  <p className="text-gray-600">
                    Ensure precise results by automating calculations and
                    reducing human errors.
                  </p>
                </li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={CalcImg}
                alt="Calculator interface demonstration"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        <section className="py-24 mb-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">
              Why Choose Us?
            </h2>
            <div className="grid md:grid-cols-3 gap-3">
              {reasons.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-8 rounded-xl bg-white hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-center mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <section className="max-w-7xl mx-auto px-4 mb-24">
          <h2 className="text-3xl font-bold text-center mb-16">
            Meet Our Team
          </h2>
          <div className="flex justify-center gap-6 mb-16">
            {testimonials.map((person, index) => (
              <div
                key={index}
                className={`w-20 h-20 rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer ${
                  index === activeIndex
                    ? "transform -rotate-12 scale-125 border-2 border-blue-500 shadow-lg"
                    : "transform -rotate-45 opacity-50 scale-90"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative min-h-[300px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`text-center transition-all duration-500 absolute w-full ${
                    index === activeIndex
                      ? "opacity-100 translate-y-0 z-10"
                      : "opacity-0 translate-y-8 z-0"
                  }`}
                >
                  <div className="text-7xl text-gray-300 font-serif leading-none">
                    <img src={QuoteSvg} alt="" />
                  </div>
                  <blockquote className="text-gray-600 italic text-lg leading-relaxed my-6 px-8">
                    {testimonial.quote}
                  </blockquote>
                  <div className="text-7xl text-gray-300 font-serif leading-none rotate-180">
                    <img src={QuoteSvg} alt="" />
                  </div>
                  <div className="mt-8">
                    <div className="text-gray-800 font-bold">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 mt-1">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}
      </div>
    </main>
  );
};

export default AboutPage;
