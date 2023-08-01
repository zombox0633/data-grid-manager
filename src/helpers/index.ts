
//ScrollY
export const handleDIVScrollY = (divRef: React.RefObject<HTMLDivElement>) => {
  if (divRef.current) {
    return divRef.current.scrollTop;
  }
};
