import { ComponentPropsWithoutRef } from "react";

type DefaultButtonPropTypes = Omit<
  ComponentPropsWithoutRef<"button">,
  "className"
> & {
  addClassName?: string;
};

function DefaultButton({
  addClassName,
  children,
  ...props
}: DefaultButtonPropTypes) {
  const buttonClass = addClassName ? addClassName : "primary__button";
  return (
    <button {...props} className={buttonClass}>
      {children}
    </button>
  );
}

export default DefaultButton;
