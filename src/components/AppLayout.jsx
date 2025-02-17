import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
// eslint-disable-next-line react/prop-types

const AppLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="  ">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
      {!pathname.includes("cost") && <Footer />}
    </>
  );
};

export default AppLayout;
