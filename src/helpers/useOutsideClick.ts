import { useEffect } from "react";

function useOutsideClick(
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void
) {
  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mouseup", handleDocumentClick);

    return () => {
      document.removeEventListener("mouseup", handleDocumentClick);
    };
  }, [ref, callback]);
}

export default useOutsideClick;

//mousedown เกิดขึ้นเมื่อปุ่มเมาส์ถูกกดลง แต่ยังไม่ได้ปล่อย
//mouseup เกิดขึ้นเมื่อปุ่มเมาส์ที่ถูกกดลงไปก่อนหน้านั้นถูกปล่อยขึ้นมา