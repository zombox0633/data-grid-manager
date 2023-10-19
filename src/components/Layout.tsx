import { Outlet } from "react-router-dom";

import NavigationBar from "./navigation/NavigationBar";

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
