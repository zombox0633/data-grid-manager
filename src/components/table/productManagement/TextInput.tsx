import { ProductsDataType } from "api/products/products.type";
import { HeaderType } from "../Table";

type TextInputType = {
  header: HeaderType<ProductsDataType>;
  value: string;
  handleInputChange: (key: keyof ProductsDataType, value: string) => void;
  isDisabled: boolean;
};

function TextInput({
  header,
  value,
  handleInputChange,
  isDisabled,
}: TextInputType) {
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
