import { useState } from "react";
import { useAtom } from "jotai";

import { registerAtom } from "atoms/registerAtom";

import useAuthentication from "hook/useAuth/useAuthentication";

function DropdownProfile() {
  const [register] = useAtom(registerAtom);

  const { onSignOut } = useAuthentication();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <div>
      <button
        className=" w-10 h-10 rounded-full bg-eerieBlack text-floralWhite font-bold focus:border-floralWhite focus:border-4 "
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        {register?.data.name.slice(0, 2).toUpperCase()}
      </button>
      <div></div>
      <div
        className={`${
          isDropdownOpen ? "visible" : "invisible"
        } absolute top-20 right-10 w-64 h-72 rounded-3xl bg-floralWhite shadow-2xl`}
      >
        <div className=" flex flex-col justify-between h-full py-6 px-4">
          <div className="h-20 flex flex-col items-center justify-center">
            <div className=" w-20 h-20 flex justify-center items-center rounded-full bg-mint text-floralWhite font-bold text-2xl">
              {register?.data.name.slice(0, 2).toUpperCase() ?? "TE"}
            </div>
          </div>
          <span className="font-bold text-center text-lg">
            {register?.data.email ?? "TEST"}
          </span>
          <button className="dropdown_profile__button">Profile</button>
          <button className="dropdown_profile__button" onClick={onSignOut}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default DropdownProfile;
