import { PropsWithChildren, useEffect } from "react";

import { loadingAtom } from "atoms/loadingAtom";
import { useAtom } from "jotai";

function GlobalLoading({ children }: PropsWithChildren) {
  const [isOpen] = useAtom(loadingAtom);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <div
        className={`absolute top-0 ${
          isOpen ? "loading__visible1" : "loading__hidden"
        } flex justify-center items-center w-screen h-screen bg-white  z-50 overflow-hidden`}
      >
        <div className=" relative w-28 h-28">
          <div className="animation1 " />
          <div className="animation2 " />
          <div className="animation3 " />
        </div>
      </div>
      {children}
    </div>
  );
}

export default GlobalLoading;
