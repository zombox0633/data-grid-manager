import React from "react";
import { Outlet } from "react-router-dom";

import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className=" flex flex-col min-h-screen">
      <NavigationBar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
