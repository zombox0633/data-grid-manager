import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { RegisterDataType } from "api/register/register.type";
import useOutsideClick from "helpers/useOutsideClick";

import { tableLink } from "src/constraint/DROPDOWN_LINK";

type DataManagerDropdownType = {
  register: RegisterDataType;
};

function DataManagerDropdown({ register }: DataManagerDropdownType) {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(dropdownRef, () => {
    setIsDropdownVisible(false);
  });

  return (
    <div className="relative ml-4 md:ml-8 lg:ml-10 text-xs sm:text-base lg:text-lg font-semibold cursor-pointer select-none">
      <div
        role="button"
        tabIndex={0}
        // onMouseEnter={() => setIsDropdownVisible(true)}
        onMouseDown={() => setIsDropdownVisible((prev) => !prev)}
        ref={dropdownRef}
        className=" w-full px-2"
      >
        {register.role === "user" ? "DataTable" : "DataManagement"}
      </div>
      <div
        className={` ${isDropdownVisible ? "visible" : "invisible"} dropdown`}
      >
        {tableLink.map((data,index) => (
          <NavLink key={index} className="dropdown__link" to={data.path}>
            {data.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default DataManagerDropdown;
