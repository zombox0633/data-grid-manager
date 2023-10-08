import { NavLink } from "react-router-dom";
import { useAtom } from "jotai";
import DefaultButton from "../button/DefaultButton";
import DropdownProfile from "./DropdownProfile";
import DataManagerDropdown from "./DataManagerDropdown";

import useNavigationHandler from "hook/useNavigationHandler";

import { registerAtom } from "atoms/registerAtom";

function NavigationBar() {
  const { handleLink } = useNavigationHandler();

  const [register] = useAtom(registerAtom);

  return (
    <div className="sticky top-0 inset-x-0 h-0 z-40">
      <div className="relative flex justify-between items-center h-20">
        <div className=" absolute inset-0 w-full bg-fuchsia-50/20 backdrop-blur-md -z-10"/>
        <div className=" flex flex-row items-end pl-4 sm:ml-8 md:ml-12 lg:ml-16 py-4">
          <NavLink to="/">
            <h2 className="font-dancing cursor-pointer select-none">Roberta</h2>
          </NavLink>
          {register && <DataManagerDropdown register={register.data} />}
        </div>
        <div className=" mr-4 sm:mr-8 md:mr-16 lg:mr-20">
          {register && <DropdownProfile />}
          {!register && (
            <DefaultButton onClick={() => handleLink("/sign-in")}>
              Sign in
            </DefaultButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
//backdrop-filter: blur();
//filter: blur();