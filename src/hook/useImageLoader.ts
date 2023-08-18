import { useState, useEffect } from "react";
import { useAtom } from "jotai";

import { loadingAtom } from "atoms/loadingAtom";

function useImageLoader(imageCount: number) {
  const [imagesLoadedCount, setImagesLoadedCount] = useState<number>(0);

  const [, setIsOpen] = useAtom(loadingAtom);

  const onImgLoaded = () => {
    setImagesLoadedCount((prev) => prev + 1);
  };

  useEffect(() => {
    setIsOpen(true);
    if (imagesLoadedCount === imageCount) {
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    }
    return () => {
      setIsOpen(false);
    };
  }, [imagesLoadedCount, imageCount, setIsOpen]);

  return {
    onImgLoaded,
  };
}

export default useImageLoader;
