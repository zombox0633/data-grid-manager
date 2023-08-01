import { useEffect, useRef, useState } from "react";

import { handleDIVScrollY } from "helpers/index";

function useHomePage() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [backgroundColor, setBackgroundColor] = useState<string>("#FAF6EF");

  const divRef = useRef<HTMLDivElement>(null);

  const newScrollY = () => {
    const ScrollY = handleDIVScrollY(divRef);
    if (ScrollY !== undefined) {
      setScrollY(ScrollY);
    }
  };

  useEffect(() => {
    if (divRef.current) {
      divRef.current.addEventListener("scroll", newScrollY, {
        passive: true,
      });
    }
    return () => {
      if (divRef.current) {
        divRef.current.removeEventListener("scroll", newScrollY);
      }
    };
  }, []);

  useEffect(() => {
    switch (true) {
      case scrollY < 500: //0
        setBackgroundColor("#c8cfc4");
        break;
      case scrollY >= 500 && scrollY < 1350: //923
        setBackgroundColor("#b2aea3");
        break;
      case scrollY >= 1350 && scrollY < 2260: //1846
        setBackgroundColor("#b97045");
        break;
      case scrollY >= 1840: //2768
        setBackgroundColor("#DBC066");
        break;
      default:
        setBackgroundColor("#FAF6EF");
        break;
    }
  }, [scrollY]);

  return {
    scrollY,
    backgroundColor,
    divRef
  };
}

export default useHomePage;
