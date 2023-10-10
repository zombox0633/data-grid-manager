import React, { useState } from "react";
import { useAtom } from "jotai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";

import { showToast } from "style/toast";
import { showAllAtom } from "atoms/table/tableAtom";

type DataTableToolbarType<T> = {
  tableName: string;
  itemLength?: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
  setFilteredData: React.Dispatch<React.SetStateAction<T[] | null>>;
  handleSearchItem: (query: string, field: keyof T) => void;
};

function DataTableToolbar<T>({
  tableName,
  itemLength = 0,
  setRefreshKey,
  setFilteredData,
  handleSearchItem,
}: DataTableToolbarType<T>) {
  const [showAll, setShowAll] = useAtom(showAllAtom);
  const [searchItem, setSearchItem] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchItem.trim() !== "") {
      handleSearchItem(searchItem, "name" as keyof T);
    } else {
      showToast("warning", "Please enter a valid search term.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };

  const handleReset = () => {
    setRefreshKey((prev) => prev + 1);
    setFilteredData(null);
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div>
      <div className=" flex flex-row items-end">
        <h4 className="mr-4">{tableName}</h4>
        <span className=" font-semibold">
          Total item available {itemLength}
        </span>
      </div>
      <div className=" flex justify-between items-center my-4">
        <form onSubmit={handleSubmit}>
          <input
            aria-label="Search for products"
            type="text"
            onChange={handleInputChange}
            className="w-72 border-2 border-eerieBlack/60 rounded-md px-2"
          />
          <button
            aria-label="Search"
            type="submit"
            className="table__small_button bg-eerieBlack ml-[0.5px]"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
          </button>
        </form>
        <div className=" flex justify-between w-20">
          <button
            aria-label={showAll ? "Show 20 row" : "Show all row"}
            onClick={toggleShowAll}
            className="table__small_button text-white bg-indigo-700"
          >
            {showAll ? "20" : "all"}
          </button>
          <button
            aria-label="Refresh table data and reset search term"
            onClick={handleReset}
            className="table__small_button bg-blue-400"
          >
            <FontAwesomeIcon icon={faArrowsRotate} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataTableToolbar;
// "name" as keyof T ระบุบว่า name เป็นข้อมูลในชนิดของ T
