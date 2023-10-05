export const handleDIVScrollY = (divRef: React.RefObject<HTMLDivElement>) => {
  if (divRef.current) {
    return divRef.current.scrollTop;
  }
};

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat().format(number);
};

export const localFormattedDate = (time: Date) => {
  const localDate = new Date(time);
  const FormattedDate = localDate.toLocaleString()
  return FormattedDate;
};

export const getCellAlignmentClass = (headerKey: string) => {
  if (headerKey === "price" || headerKey === "quantity") {
    return "text-right";
  } else if (
    headerKey === "created_timestamp" ||
    headerKey === "lastupdate_timestamp"
  ) {
    return "text-center";
  } else {
    return "text-left";
  }
};