import { ComponentPropsWithoutRef } from "react";

type DefaultInputPropTypes = Omit<
  ComponentPropsWithoutRef<"input">,
  "style" | "className"
> & {
  addClassName?: string;
};

function DefaultInput({
  addClassName,
  children,
  ...props
}: DefaultInputPropTypes) {
  const inputClass = addClassName ? addClassName : "sign_in__input";
  return (
    <input {...props} className={inputClass}>
      {children}
    </input>
  );
}

export default DefaultInput;