//ScrollY
export const handleDIVScrollY = (divRef: React.RefObject<HTMLDivElement>) => {
  if (divRef.current) {
    return divRef.current.scrollTop;
  }
};

//Copy Text to Clipboard
export const copyToClipboard = (text:string) => {
  navigator.clipboard.writeText(text)
}