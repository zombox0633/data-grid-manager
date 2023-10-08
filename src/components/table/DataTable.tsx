import { useState } from "react";
import Table from "./Table";
import DataTableToolbar from "./DataTableToolbar";

import useSearchItem from "hook/useDataTable/useSearchItem";

import { HeaderType, LoadDataType } from "types/Table.type";

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

  const { itemError, handleSearchItem, displayData, setFilteredData } =
    useSearchItem<T>({
      loadData,
      showAll,
    });

  const itemLength = displayData.length ?? 0;

  return (
    <div>
      <DataTableToolbar<T>
        tableName={nameTable}
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
