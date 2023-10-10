import TableHead from "../TableHead";
import TableStateRow from "../TableStateRow";
import AddItemRow from "./AddItemRow";
import ItemRow from "./ItemRow";
import DataTableToolbar from "../DataTableToolbar";

import useLoadingDefault from "hook/useLoadingDefault";
import useSearchItem from "hook/useDataTable/useSearchItem";

import { HeaderType, LoadDataType, tableRowItemId } from "types/Table.type";
import { DropdownItemType } from "./ItemDropDown";

type TableManagementType<T, U> = {
  tableName: string;
  itemHeaders: HeaderType<T>[];
  loadData: LoadDataType<T>;
  dropDownItem: U[] | null;
  newItemToAdd: Partial<T>;
  handleNewItemInputChange: (key: keyof T, value: string) => void;
  handleAdd: () => Promise<void>;
  handleResetAdd: () => void;
  handleUpdateItem: (item: any) => Promise<boolean>;
  handleDeleteItem: (itemId: string) => Promise<boolean>;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

function TableManagement<T extends tableRowItemId, U extends DropdownItemType>({
  tableName,
  itemHeaders,
  loadData,
  dropDownItem,
  newItemToAdd,
  handleNewItemInputChange,
  handleAdd,
  handleResetAdd,
  handleUpdateItem,
  handleDeleteItem,
  setRefreshKey,
}: TableManagementType<T, U>) {
  const { itemError, handleSearchItem, displayData, setFilteredData } =
    useSearchItem<T>({ loadData});

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
      <table
        className={`${
          !displayData || displayData?.length === 0 ? "h-[60vh]" : "h-auto"
        } w-[90vw] border border-eerieBlack border-collapse overflow-hidden`}
      >
        <TableHead headers={itemHeaders} isManagement={true} />
        <tbody>
          <AddItemRow<T, U>
            headers={itemHeaders}
            newItem={newItemToAdd}
            dropDownItem={dropDownItem}
            handleAddItem={handleAdd}
            handleNewItemInputChange={handleNewItemInputChange}
            handleResetAdd={handleResetAdd}
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
            <ItemRow<T, U>
              headers={itemHeaders}
              key={item.id}
              item={item}
              dropdownItem={dropDownItem}
              setRefreshKey={setRefreshKey}
              handleUpdateItem={handleUpdateItem}
              handleDeleteItem={handleDeleteItem}
              rowColor={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableManagement;
