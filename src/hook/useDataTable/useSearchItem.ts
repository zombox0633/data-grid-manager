import { LoadDataType } from "components/table/DataTable";
import { useState } from "react";

// type loadProductsDataType = {
//   //การทำ Dependency Injection
//   loadProductsData: () => UseGetProductsReturnDataType;
// };

type useSearchItemType<T> = {
  loadData: LoadDataType<T>;
  showAll: boolean;
};

function useSearchItem<T>(props: useSearchItemType<T>) {
  const { loadData, showAll } = props;
  const [data, itemError] = loadData();

  const [filteredData, setFilteredData] = useState<T[] | null>(null);

  const itemLength = data?.length ?? 0;

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
    itemLength,
    itemError,
    handleSearchItem,
    displayData,
    setFilteredData,
  };
}

export default useSearchItem;

// filter คืนค่าเป็น array ที่ประกอบด้วยทุก elements ที่สอดคล้องกับเงื่อนไข
// find คืนค่าเป็น element แรกที่สอดคล้องกับเงื่อนไขที่กำหนดใน และ เอาเฉพาะตัวแรกที่เจอก่อนมาแสดง
