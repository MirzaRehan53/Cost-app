import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen  mt-20 py-12 ">
      <div className="">
        <div className="inline-block px-3 py-3 mb-6 text-sm rounded-[20px] border-2 font-medium border-black text-black">
          Last Update: 12.12.2024
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Terms & Conditions
        </h1>

        <p className="text-[#0C0E1199] mb-8">
          This Website Terms of Service ("Agreement") is entered into by and
          between website B.V. ("Cost") and the entity or person placing an
          order for or accessing the Services ("Customer"). This Agreement
          consists of the terms and conditions set forth below and any Order
          Form. The "Effective Date" of this Agreement is the date which is the
          earlier of (a) Customer's initial access to the Services through any
          online provisional registration or order process or (b) the Effective
          Date of the first Order Form. This Agreement will govern Customer's
          initial purchase on the Effective Date as well as any future purchases
          made by Customer that reference this Agreement. Framer may modify this
          Agreement from time to time as permitted in Section 13.4 (Amendment).
        </p>

        <p className="text-[#0C0E1199] mb-12">
          Capitalized terms shall have the meanings set forth in Section 1, or
          in the section where they are first used
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            1. Definitions
          </h2>
          <div className="space-y-6">
            {[
              {
                id: "1.1",
                title: "Authorized Devices",
                content:
                  "means those mobile, desktop, or other devices with which the Services can be accessed and used.",
              },
              {
                id: "1.2",
                title: "Content",
                content:
                  "means code, content, fonts, graphics, designs, documents, or materials created using the Services by Customer and its Users or imported into the Services by Customer and its Users.",
              },
              {
                id: "1.3",
                title: "Documentation",
                content:
                  "means the technical materials made available by Framer to Customer and/or its Users in hard copy or electronic form describing the use and operation of the Services.",
              },
            ].map((item) => (
              <div key={item.id} className="ml-4">
                <p className="">
                  <span className="font-semibold text-[#0C0E1199]">
                    {item.id} "{item.title}"
                  </span>{" "}
                  <span className="text-[#0C0E1199]">{item.content}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            2. License and use rights
          </h2>
          <div className="space-y-6">
            <div className="ml-4">
              <p className="text-[#0C0E1199]">
                <span className="font-semibold text-[#0C0E1199]">
                  2.1 Services.
                </span>
                <span>
                  {" "}
                  Framer hereby grants Customer a non-exclusive,
                  non-transferable license during the Term (as defined in
                  Section 12) to: (a) use the Services and to download and
                  install desktop or mobile applications as applicable on the
                  number and type of Authorized Devices solely for Customer's
                  internal business purposes in accordance with the
                  Documentation; and/or (b) use our SaaS product, hosted
                  systems, design software, tools, and build websites under the
                  framer.app domain. The Services are delivered electronically.
                </span>
              </p>
            </div>
            <div className="ml-4">
              <p className="text-gray-900">
                <span className="font-semibold text-[#0C0E1199] ">
                  2.2 Provisioning the Services.
                </span>{" "}
                <span className="text-[#0C0E1199]">
                  Framer will provide to Customer the necessary passwords,
                  security protocols, policies, network links or connections
                  ("Access Protocols") to allow Customer and its Users to access
                  the Services as described herein; no other access to the
                  website or servers from which the Services are delivered is
                  permitted. Customer will provision its Users to access and use
                  the features and functions of the Services through the Access
                  Protocols. Customer may select one or more Users to act as
                  administrators and control, manage and use the Services on
                  Customer's behalf. Customer shall be responsible for all acts
                  and omissions of its Users.
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
