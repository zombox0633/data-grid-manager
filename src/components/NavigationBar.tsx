import { NavLink } from "react-router-dom";

import useNavigationHandler from "hook/useNavigationHandler";
import DefaultButton from "./button/DefaultButton";

function NavigationBar() {
  const { handleLink } = useNavigationHandler();

  return (
    <div className="sticky top-0 inset-x-0 h-0 z-40">
      <div className="relative flex justify-between items-center h-16 bg-transparent ">
        <div className=" pl-4 sm:ml-8 md:ml-12 lg:ml-16 py-4">
          <NavLink to="/">
            <h2 className="font-dancing cursor-pointer select-none">Roberta</h2>
          </NavLink>
        </div>
        <div className=" mr-4 sm:mr-8 md:mr-16 lg:mr-20">
          <DefaultButton onClick={() => handleLink("/sign-in")}>
            Sign in
          </DefaultButton>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
