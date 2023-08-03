import { useEffect, useRef, useState } from "react";

import { handleDIVScrollY } from "helpers/index";

function useHomePage() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [backgroundColor, setBackgroundColor] = useState<string>("bg-floralWhite");

  const divRef = useRef<HTMLDivElement>(null);

  //getComputedStyle avaScript ที่สามารถได้รับค่าของรูปแบบการแสดงผลทั้งหมดของตัวอย่างวัตถุ HTML. รวมถึงรูปแบบที่ถูกประยุกต์ใช้จาก CSS
  //document.documentElement ระบุวัตถุ root ของ HTML หรือ <html> element.
  //getPropertyValue() เป็นเมธอดที่สามารถได้รับค่าของ property ที่ระบุใน CSS.
  // const bgColor = getComputedStyle(document.documentElement).getPropertyValue(
  //   backgroundColor
  // );

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
        setBackgroundColor("bg-ashGray");
        break;
      case scrollY >= 500 && scrollY < 1350: //923
        setBackgroundColor("bg-silver");
        break;
      case scrollY >= 1350 && scrollY < 2260: //1846
        setBackgroundColor("bg-brownSugar");
        break;
      case scrollY >= 1840: //2768
        setBackgroundColor("bg-oldGold");
        break;
      default:
        setBackgroundColor("bg-floralWhite");
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
