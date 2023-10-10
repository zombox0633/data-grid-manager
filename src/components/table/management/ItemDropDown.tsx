import { useAtom } from "jotai";
import { isDisabledAtom } from "atoms/table/tableAtom";
import { HeaderType } from "types/Table.type";

export interface DropdownItemType {
  id: string;
  name: string;
}

type ItemDropDownType<T, U> = {
  header: HeaderType<T>;
  value: string;
  items: U[] | null;
  handleInputChange: (key: keyof T, value: string) => void;
};

function ItemDropDown<T, U extends DropdownItemType>({
  header,
  value,
  items,
  handleInputChange,
}: ItemDropDownType<T, U>) {
  const [isDisabled] = useAtom(isDisabledAtom);
  
  return (
    <select
      aria-label="Select product category"
      value={value}
      onChange={(e) => handleInputChange(header.key, e.target.value)}
      disabled={isDisabled}
      className="dropdown_table"
    >
      <option value={""} disabled>
        Select category
      </option>
      {items &&
        items?.map((data: DropdownItemType) => (
          <option key={data.id} aria-label={header.label} value={data.id}>
            {data.name}
          </option>
        ))}
    </select>
  );
}

export default ItemDropDown;
