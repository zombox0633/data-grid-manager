import { ComponentPropsWithRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

type ScrollToTopButtonType = Omit<ComponentPropsWithRef<"button">, "className">;

function ScrollToTopButton({ ...props }: ScrollToTopButtonType) {
  return (
    <button
      {...props}
      className="absolute bottom-8 right-12 w-10 h-10 rounded-full bg-eerieBlack/50 backdrop-blur-md  hover:shadow-xl z-40"
    >
      <FontAwesomeIcon icon={faArrowUp} color="white"/>
    </button>
  );
}

export default ScrollToTopButton;
