import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";

import { showToast } from "style/toast";

type DataTableToolbarType<T> = {
  itemLength?: number;
  showAll: boolean;
  setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
  setFilteredData: React.Dispatch<React.SetStateAction<T[] | null>>;
  handleSearchProduct: (query: string) => void;
};

function DataTableToolbar<T>({
  itemLength = 0,
  showAll,
  setShowAll,
  setRefreshKey,
  setFilteredData,
  handleSearchProduct,
}: DataTableToolbarType<T>) {
  const [searchItem, setSearchItem] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchItem.trim() !== "") {
      handleSearchProduct(searchItem);
    } else {
      showToast("warning", "Please enter a valid search term.");
    }
  };

  const handleInputChange = (value: string) => {
    setSearchItem(value);
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
        <h4 className="mr-4">Product</h4>
        <span className=" font-semibold">
          Total item available {itemLength}
        </span>
      </div>
      <div className=" flex justify-between items-center my-4">
        <form onSubmit={handleSubmit}>
          <input
            aria-label="Search for products"
            type="text"
            onChange={(e) => handleInputChange(e.target.value)}
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
