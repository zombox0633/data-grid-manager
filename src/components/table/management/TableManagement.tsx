import TableHead from "../TableHead";
import TableStateRow from "../TableStateRow";
import AddItemRow from "./AddItemRow";
import ItemRow from "./ItemRow";
import DataTableToolbar from "../DataTableToolbar";

import useLoadingDefault from "hook/useLoadingDefault";
import useSearchItem from "hook/useDataTable/useSearchItem";

import {
  HeaderType,
  LoadDataType,
  TableType,
  tableRowItemId,
} from "types/Table.type";

type TableManagementType<T> = {
  tableName: TableType;
  itemHeaders: HeaderType<T>[];
  loadData: LoadDataType<T>;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

function TableManagement<T extends tableRowItemId>({
  tableName,
  itemHeaders,
  loadData,
  setRefreshKey,
}: TableManagementType<T>) {
  const { itemError, handleSearchItem, displayData, setFilteredData } =
    useSearchItem<T>({ loadData });

  const itemLength = displayData.length ?? 0;

  useLoadingDefault();

  return (
    <div className="mb-10">
      <DataTableToolbar<T>
        tableName={tableName}
        itemLength={itemLength}
        setRefreshKey={setRefreshKey}
        setFilteredData={setFilteredData}
        handleSearchItem={handleSearchItem}
      />
      <div className="rounded-t-md overflow-hidden">
        <table
          className={`${
            !displayData || displayData?.length === 0 ? "h-[60vh]" : "h-auto"
          } w-[90vw] border border-eerieBlack border-collapse `}
        >
          <TableHead headers={itemHeaders} isManagement={true} />
          <tbody>
            <AddItemRow<T>
              headers={itemHeaders}
              tableType={tableName}
              setRefreshKey={setRefreshKey}
            />
            {itemError && (
              <TableStateRow
                status="error"
                error={itemError}
                colSpan={itemHeaders.length}
              />
            )}
            {!displayData && !itemError && (
              <TableStateRow status="loading" colSpan={itemHeaders.length} />
            )}
            {displayData && displayData?.length === 0 && !itemError && (
              <TableStateRow status="empty" colSpan={itemHeaders.length} />
            )}
            {displayData.map((item, index) => (
              <ItemRow<T>
                key={item.id}
                headers={itemHeaders}
                tableType={tableName}
                item={item}
                setRefreshKey={setRefreshKey}
                rowColor={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableManagement;
