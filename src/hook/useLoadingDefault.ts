import { useEffect } from "react";
import { useAtom } from "jotai";
import { loadingAtom } from "atoms/loadingAtom";

function useLoadingDefault() {
  const [, setIsOpen] = useAtom(loadingAtom);

  useEffect(() => {
    setIsOpen(true);
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [setIsOpen]);
}

export default useLoadingDefault;
