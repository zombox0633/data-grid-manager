import { useState } from "react";
import Table, { HeaderType } from "./Table";
import DataTableToolbar from "./DataTableToolbar";

import useSearchItem from "hook/useDataTable/useSearchItem";

export type LoadDataType<T> = () => [T[] | null, string | null];
type DataTableType<T> = {
  nameTable: string;
  loadData: LoadDataType<T>;
  tableHeaders: HeaderType<T>[];
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

function DataTable<T>({
  nameTable,
  loadData,
  tableHeaders,
  setRefreshKey,
}: DataTableType<T>) {
  const [showAll, setShowAll] = useState<boolean>(false);

  const {
    itemLength,
    itemError,
    handleSearchItem,
    displayData,
    setFilteredData,
  } = useSearchItem<T>({
    loadData: loadData,
    showAll: showAll,
  });

  return (
    <div>
      <DataTableToolbar<T>
        nameTable={nameTable}
        itemLength={itemLength}
        showAll={showAll}
        setShowAll={setShowAll}
        setRefreshKey={setRefreshKey}
        setFilteredData={setFilteredData}
        handleSearchItem={handleSearchItem}
      />
      {displayData && (
        <Table headers={tableHeaders} data={displayData} error={itemError} />
      )}
    </div>
  );
}

export default DataTable;
