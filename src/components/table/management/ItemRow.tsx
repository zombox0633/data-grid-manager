import { useState } from "react";
import TextInput from "./TextInput";
import TableRowAction from "./TableRowAction";
import ItemDropDown, { DropdownItemType } from "./ItemDropDown";
import {
  formatNumber,
  getCellAlignmentClass,
  localFormattedDate,
} from "helpers/index";

import useTableRowAction from "hook/useTable/useTableRowAction";
import useGetUsers from "hook/useDataTable/user/useGetUsers";
import { ActionState, HeaderType, tableRowItemId } from "types/Table.type";

type ItemRowType<T, U> = {
  headers: HeaderType<T>[];
  item: T;
  dropdownItem: U[] | null;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
  handleUpdateItem: (item: any) => Promise<boolean>;
  handleDeleteItem: (itemId: string) => Promise<boolean>;
  rowColor: number;
};

function ItemRow<T extends tableRowItemId, U extends DropdownItemType>({
  headers,
  item,
  dropdownItem: itemDropDown,
  setRefreshKey,
  handleUpdateItem,
  handleDeleteItem,
  rowColor,
}: ItemRowType<T, U>) {
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
    items: item,
    handleUpdateItem,
    handleDeleteItem,
    setActionState,
    setRefreshKey,
  });

  const { loadUserData } = useGetUsers();
  const [usersData] = loadUserData();

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
            <ItemDropDown<T, U>
              header={header}
              value={categoryId}
              items={itemDropDown}
              handleInputChange={handleEditInputChange}
            />
          );
        return (
          itemDropDown?.find((dropDown) => dropDown.id === item[header.key])
            ?.name || String(item[header.key])
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
