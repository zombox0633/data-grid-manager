import { useEffect } from "react";
import { CancelTokenSource } from "axios";
import useCancelToken from "hook/useCancelToken";

type useGetData<T> = {
  itemData: T[] | undefined;
  getDataItem: () => Promise<void>;
  itemError: string | null;
  cancelTokenSource: CancelTokenSource | null;
  refreshKey: number | undefined;
};

export type UseGetDataReturnDataType<T> = [
  data: T[] | null,
  error: null | string
];

function useGetData<T>({
  itemData,
  getDataItem,
  itemError,
  cancelTokenSource,
  refreshKey,
}: useGetData<T>) {
  
  useEffect(() => {
    getDataItem();
  }, [refreshKey, getDataItem]);

  useCancelToken(cancelTokenSource);

  const loadData = (): UseGetDataReturnDataType<T> => {
    if (itemData) {
      return [itemData, null];
    }
    if (itemError) {
      console.warn(itemError);
      return [null, itemError];
    }
    return [null, null];
  };

  return {
    loadData,
  };
}

export default useGetData;
