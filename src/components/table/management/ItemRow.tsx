import { useState } from "react";
import TextInput from "./TextInput";
import TableRowAction from "./TableRowAction";
import ItemDropDown from "./ItemDropDown";
import {
  formatNumber,
  getCellAlignmentClass,
  localFormattedDate,
} from "helpers/index";

import useTableRowAction from "hook/useTable/useTableRowAction";
import useGetUsers from "hook/useDataTable/user/useGetUsers";
import useGetCategory from "hook/useDataTable/category/useGetCategory";

import {
  ActionState,
  HeaderType,
  TableType,
  tableRowItemId,
} from "types/Table.type";
import { CategoryDataType } from "api/category/category.type";

type ItemRowType<T> = {
  headers: HeaderType<T>[];
  tableType: TableType;
  item: T;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
  rowColor: number;
};

function ItemRow<T extends tableRowItemId>({
  headers,
  tableType,
  item,
  setRefreshKey,
  rowColor,
}: ItemRowType<T>) {
  const [actionState, setActionState] = useState<ActionState>({
    type: null,
    id: null,
  });

  const {
    editingValues,
    handleConfirmEdit,
    handleConfirmDelete,
    handleEditInputChange,
    setEditingValues,
  } = useTableRowAction({
    tableType,
    items: item,
    setActionState,
    setRefreshKey,
  });

  const { loadUserData } = useGetUsers();
  const [usersData] = loadUserData();
  const { loadCategoryData } = useGetCategory();
  const [categoryData] = loadCategoryData();

  const { id: itemId } = item;
  const categoryId =
    "category_id" in editingValues ? (editingValues.category_id as string) : "";

  const isEvenRow = rowColor % 2 === 0;
  const rowClassName = isEvenRow ? "bg-white" : "bg-eerieBlack/10";

  const renderTdProduct = (header: HeaderType<T>) => {
    const isEditingCurrentRow =
      actionState.id === itemId && actionState.type === "edit";
    const isEditableField =
      header.editable &&
      actionState.id === itemId &&
      actionState.type === "edit";

    switch (header.key) {
      case "category_id":
        if (isEditingCurrentRow)
          return (
            <ItemDropDown<T, CategoryDataType>
              header={header}
              value={categoryId}
              items={categoryData}
              handleInputChange={handleEditInputChange}
            />
          );
        return (
          categoryData?.find((data) => data.id === item[header.key])?.name ||
          String(item[header.key])
        );
      case "price":
      case "quantity":
        return isEditableField ? (
          <TextInput<T>
            header={header}
            value={String(item[header.key])}
            handleInputChange={handleEditInputChange}
          />
        ) : (
          formatNumber(Number(item[header.key]))
        );
      case "password":
        return;
      case "last_op_id":
        return (
          usersData?.find((user) => user.id === item[header.key])?.name ||
          String(item[header.key])
        );
      case "created_timestamp":
      case "lastupdate_timestamp":
        return localFormattedDate(item[header.key] as Date);
      default:
        return isEditableField ? (
          <TextInput
            header={header}
            value={String(item[header.key])}
            handleInputChange={handleEditInputChange}
          />
        ) : (
          String(item[header.key])
        );
    }
  };

  const renderItemCell = (header: HeaderType<T>) => (
    <td
      key={String(header.key)}
      className={`td__normal_state ${getCellAlignmentClass(
        String(header.key)
      )}`}
    >
      {renderTdProduct(header)}
    </td>
  );

  const renderTableRowAction = () => (
    <td className="px-4 py-2 border border-eerieBlack">
      <TableRowAction<T>
        itemId={itemId}
        actionState={actionState}
        handleConfirmEdit={handleConfirmEdit}
        handleConfirmDelete={handleConfirmDelete}
        setActionState={setActionState}
        setEditingValues={setEditingValues}
      />
    </td>
  );

  return (
    <tr key={itemId} className={rowClassName}>
      {headers.map(renderItemCell)}
      {renderTableRowAction()}
    </tr>
  );
}

export default ItemRow;
