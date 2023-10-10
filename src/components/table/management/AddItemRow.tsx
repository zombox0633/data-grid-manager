import { useAtom } from "jotai";
import DefaultButton from "components/button/DefaultButton";
import ItemDropDown, { DropdownItemType } from "./ItemDropDown";
import TextInput from "./TextInput";

import { getCellAlignmentClass } from "helpers/index";

import { registerAtom } from "atoms/registerAtom";
import { isDisabledAtom } from "atoms/table/tableAtom";

import { HeaderType } from "types/Table.type";

type AddItemRowType<T, U> = {
  headers: HeaderType<T>[];
  newItem: Partial<T>;
  dropDownItem: U[] | null;
  handleAddItem: () => Promise<void>;
  handleNewItemInputChange: (key: keyof T, value: string) => void;
  handleResetAdd: () => void;
};

function AddItemRow<T, U extends DropdownItemType>({
  headers,
  newItem,
  dropDownItem,
  handleAddItem,
  handleNewItemInputChange,
  handleResetAdd,
}: AddItemRowType<T, U>) {
  const [register] = useAtom(registerAtom);
  const [isDisabled] = useAtom(isDisabledAtom);

  const registerName = register?.data.name as string;
  const categoryId = "category_id" in newItem ? (newItem.category_id as string) : "";

  
  const renderTdAddProduct = (header: HeaderType<T>) => {
    switch (header.key) {
      case "category_id":
        return (
          <ItemDropDown<T, U>
            header={header}
            value={categoryId}
            items={dropDownItem}
            handleInputChange={handleNewItemInputChange}
          />
        );
      case "last_op_id":
        return registerName ?? "Please login";
      case "created_timestamp":
        return;
      case "lastupdate_timestamp":
        return "Timestamp auto-saved";
      default:
        return (
          <TextInput<T>
            header={header}
            value={String(newItem[header.key] || "")}
            handleInputChange={handleNewItemInputChange}
          />
        );
    }
  };

  return (
    <tr>
      {headers.map((header) => (
        <td
          key={String(header.key)}
          className={`td__normal_state bg-eerieBlack/10 ${getCellAlignmentClass(
            String(header.key)
          )}`}
        >
          {renderTdAddProduct(header)}
        </td>
      ))}
      <td className="px-4 py-2 border border-eerieBlack bg-eerieBlack/10">
        <DefaultButton
          aria-label="Add new product"
          onClick={handleAddItem}
          disabled={isDisabled}
          addClassName="table__button bg-green-400 disabled:bg-green-400/70"
        >
          Add
        </DefaultButton>
        <DefaultButton
          aria-label="Reset input fields"
          onClick={handleResetAdd}
          disabled={isDisabled}
          addClassName="table__button bg-blue-400 disabled:bg-blue-400/70"
        >
          Reset
        </DefaultButton>
      </td>
    </tr>
  );
}

export default AddItemRow;
