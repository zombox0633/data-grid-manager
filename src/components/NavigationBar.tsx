import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function NavigationBar() {
  const navigate = useNavigate();

  const handleLink = () => {
    navigate("/sign-in");
  };

  return (
    <div className="sticky top-0 inset-x-0 h-0 z-50">
      <div className="relative flex justify-between items-center h-16 bg-transparent ">
        <div className=" pl-4 sm:ml-8 md:ml-12 lg:ml-16 py-4">
          <NavLink to="/">
            <span className="font-dancing text-5xl font-bold cursor-pointer">
              Roberta
            </span>
          </NavLink>
        </div>
        <div className=" mr-4 sm:mr-8 md:mr-16 lg:mr-20">
          <button onClick={handleLink} className="primary-button">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
