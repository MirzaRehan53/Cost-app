import React from "react";
import ContactImg from "../../assets/contact.jpg";
import PhoneIcon from "../../assets/phone.svg";
import EmailIcon from "../../assets/email.svg";
import Footer from "../../components/Footer";
const ContactPage = () => {
  return (
    <div className="w-full h-full px-20">
      <section className="SECTION-CONTACT min-h-screen   ">
        <div className="flex flex-col justify-between gap-5 top-20 h-full relative ">
          <div className="h-1/2  w-full">
            <img src={ContactImg} alt="" className="rounded-[50px] w-full" />
          </div>
          <div className="h-1/2  flex items-center justify-center ">
            <div className="flex flex-row gap-10">
              <div
                className="flex flex-col items-center justify-center h-[130px] w-[250px] gap-2"
                style={{
                  background: "#F4F4F4",
                  boxShadow: "0px 4px 15px rgba(12, 14, 17, 0.1)",
                  borderRadius: "5px",
                }}
              >
                <div>
                  <img src={PhoneIcon} alt="" className="size-10" />
                </div>
                <div className="font-semibold text-[20px]">Phone Line</div>
                <div className="font-medium text-sm">0761-8532-876</div>
              </div>
              <div
                className="flex flex-col items-center justify-center h-[130px] w-[250px] gap-2"
                style={{
                  background: "#F4F4F4",
                  boxShadow: "0px 4px 15px rgba(12, 14, 17, 0.1)",
                  borderRadius: "5px",
                }}
              >
                <div>
                  <img src={EmailIcon} alt="" className="size-10" />
                </div>
                <div className="font-semibold text-[20px]">Email Address</div>
                <div className="font-medium text-sm">dummy@gmail.com</div>
              </div>
              <div
                className="flex flex-col items-center justify-center h-[130px] w-[250px] gap-2"
                style={{
                  background: "#F4F4F4",
                  boxShadow: "0px 4px 15px rgba(12, 14, 17, 0.1)",
                  borderRadius: "5px",
                }}
              >
                <div>
                  <img src={PhoneIcon} alt="" className="size-10" />
                </div>
                <div className="font-semibold text-[20px]">Phone Line</div>
                <div className="font-medium text-sm">0761-8532-876</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="h-dvh w-full  bg-white flex items-center justify-center">
        <div className="w-full  px-20 rounded-lg">
          <div className="flex flex-row justify-between gap-8  items-center">
            {/* Left side text content */}
            <div className="flex items-center w-1/2 justify-center flex-col ">
              <div className="">
                <h2 className="text-2xl font-bold mb-2 text-start">
                  Get In Touch
                </h2>
                <h3 className="text-3xl font-bold mb-4 text-start">
                  Have Anything To Ask?
                </h3>

                <p className="text-gray-600 w-[60%]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>

            {/* Right side form */}
            <div className="w-1/2">
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border-b-2 border-gray-300 bg-transparent outline-none focus:border-black transition-colors"
                    placeholder="Name*"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    className="w-full p-2 border-b-2 border-gray-300 bg-transparent outline-none focus:border-black transition-colors"
                    placeholder="Email Address*"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border-b-2 border-gray-300 bg-transparent outline-none focus:border-black transition-colors"
                    placeholder="Inquiry*"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
