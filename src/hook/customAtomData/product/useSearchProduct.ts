import { useState } from "react";

import { UseGetProductsReturnDataType } from "hook/customAtomData/product/useGetProducts";
import { ProductsDataType } from "api/products/products.type";

type loadDataType = {
  //การทำ Dependency Injection
  loadProductsData: () => UseGetProductsReturnDataType;
};

type useSearchProductType = loadDataType & {
  showAll: boolean;
};

function useSearchProduct(props: useSearchProductType) {
  const { loadProductsData, showAll } = props;
  const [productData, productError] = loadProductsData();

  const [filteredData, setFilteredData] = useState<ProductsDataType[] | null>(
    null
  );

  const itemLength = productData?.data?.length ?? 0;

  const handleSearchProduct = (query: string) => {
    if (!productData?.data) return;
    const result = productData?.data.filter((product) =>
      product.name.toLowerCase().includes(query.toLocaleLowerCase().trim())
    );
    setFilteredData(result);
  };

  const getDisplayData = () => {
    return filteredData ?? productData?.data ?? [];
  };

  const displayData = showAll
    ? getDisplayData()
    : getDisplayData().slice(0, 20);

  return {
    itemLength,
    productError,
    handleSearchProduct,
    displayData,
    setFilteredData,
  };
}

export default useSearchProduct;

// filter คืนค่าเป็น array ที่ประกอบด้วยทุก elements ที่สอดคล้องกับเงื่อนไข
// find คืนค่าเป็น element แรกที่สอดคล้องกับเงื่อนไขที่กำหนดใน และ เอาเฉพาะตัวแรกที่เจอก่อนมาแสดง
