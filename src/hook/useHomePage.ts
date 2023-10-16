import { useCallback, useEffect, useRef, useState } from "react";

function useHomePage() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] =
    useState<string>("bg-floralWhite");

  const divRef = useRef<HTMLDivElement>(null);

  //getComputedStyle avaScript ที่สามารถได้รับค่าของรูปแบบการแสดงผลทั้งหมดของตัวอย่างวัตถุ HTML. รวมถึงรูปแบบที่ถูกประยุกต์ใช้จาก CSS
  //document.documentElement ระบุวัตถุ root ของ HTML หรือ <html> element.
  //getPropertyValue() เป็นเมธอดที่สามารถได้รับค่าของ property ที่ระบุใน CSS.
  // const bgColor = getComputedStyle(document.documentElement).getPropertyValue(
  //   backgroundColor
  // );
  const handleDIVScrollY = (divRef: React.RefObject<HTMLDivElement>) => {
    if (divRef.current) {
      const scrollTop = divRef.current.scrollTop;
      return scrollTop
    }
    return 0
  };

  const handleScrollToTop = useCallback(() => {
    if (divRef.current) {
      divRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

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
    setShowButton(scrollY >= 500);
  }, [scrollY]);

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
    showButton,
    backgroundColor,
    divRef,
    handleScrollToTop
  };
}

export default useHomePage;
