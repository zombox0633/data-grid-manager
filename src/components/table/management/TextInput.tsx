import { useAtom } from "jotai";
import { isDisabledAtom } from "atoms/table/tableAtom";
import { HeaderType } from "types/Table.type";

type TextInputType<T> = {
  header: HeaderType<T>;
  value: string | number;
  handleInputChange: (key: keyof T, value: string) => void;
};

function TextInput<T>({
  header,
  value,
  handleInputChange,
}: TextInputType<T>) {
  const [isDisabled] = useAtom(isDisabledAtom);
  
  return (
    <input
      {...(header.key === "price" || header.key === "quantity"
        ? {
            type: "number",
            min: "0",
            max: "99999",
          }
        : { type: "text" })}
      aria-label={header.label}
      defaultValue={value}
      disabled={isDisabled}
      placeholder={header.label}
      onChange={(e) => handleInputChange(header.key, e.target.value)}
      className="table__input"
    />
  );
}

export default TextInput;
