import { useAtom } from "jotai";
import { useState } from "react";
import { showAllAtom } from "atoms/table/tableAtom";
import { LoadDataType } from "types/Table.type";

// type loadProductsDataType = {
//   //การทำ Dependency Injection
//   loadProductsData: () => UseGetProductsReturnDataType;
// };

type useSearchItemType<T> = {
  loadData: LoadDataType<T>;
};

function useSearchItem<T>({loadData}: useSearchItemType<T>) {
  const [showAll] = useAtom(showAllAtom)

  const [data, itemError] = loadData();
  
  const [filteredData, setFilteredData] = useState<T[] | null>(null);

  // const itemLength = data?.length ?? 0;

  const handleSearchItem = (query: string, field: keyof T) => {
    if (!data) return;
    const result = data.filter((item) =>
      String(item[field])
        .toLowerCase()
        .includes(query.toLocaleLowerCase().trim())
    );
    setFilteredData(result);
  };

  const getDisplayData = () => {
    return filteredData ?? data ?? [];
  };

  const displayData = showAll
    ? getDisplayData()
    : getDisplayData().slice(0, 20);

  return {
    itemError,
    handleSearchItem,
    displayData,
    setFilteredData,
  };
}

export default useSearchItem;

// filter คืนค่าเป็น array ที่ประกอบด้วยทุก elements ที่สอดคล้องกับเงื่อนไข
// find คืนค่าเป็น element แรกที่สอดคล้องกับเงื่อนไขที่กำหนดใน และ เอาเฉพาะตัวแรกที่เจอก่อนมาแสดง
