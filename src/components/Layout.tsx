import React from "react";
import { Outlet } from "react-router-dom";

import NavigationBar from "./NavigationBar";

function Layout() {
  return (
    <div className=" flex flex-col min-h-full">
      <NavigationBar />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
