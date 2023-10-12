import { useAtom } from "jotai";
import { showToast } from "style/toast";

import {
  updateProductAtom,
  updateProductCancelTokenAtom,
  updateProductErrorAtom,
} from "atoms/productAtom/updateProductAtom";
import {
  addProductAtom,
  addProductCancelTokenAtom,
  addProductErrorAtom,
} from "atoms/productAtom/addProductAtom";
import {
  deleteProductAtom,
  deleteProductCancelTokenAtom,
  deleteProductErrorAtom,
} from "atoms/productAtom/deleteProductAtom";

import useErrorHandlerApi from "hook/useErrorHandlerApi";
import useCancelToken from "hook/useCancelToken";

export type AddProductType = {
  nameProduct: string;
  category_id: string;
  priceProduct: number;
  quantityProduct: number;
  user_id: string;
};

export type UpdateProductType = {
  product_id: string;
  nameProduct?: string;
  category_id?: string;
  priceProduct?: number;
  quantityProduct?: number;
  user_id: string;
};

function useProductActions() {
  const [, addProduct] = useAtom(addProductAtom);
  const [addProductError] = useAtom(addProductErrorAtom);
  const [addProductCancel] = useAtom(addProductCancelTokenAtom);

  const [, updateProduct] = useAtom(updateProductAtom);
  const [updateProductError] = useAtom(updateProductErrorAtom);
  const [updateProductCancel] = useAtom(updateProductCancelTokenAtom);

  const [, deleteProduct] = useAtom(deleteProductAtom);
  const [deleteProductError] = useAtom(deleteProductErrorAtom);
  const [deleteProductCancel] = useAtom(deleteProductCancelTokenAtom);

  useCancelToken(addProductCancel);
  useCancelToken(updateProductCancel);
  useCancelToken(deleteProductCancel);

  useErrorHandlerApi(addProductError);
  useErrorHandlerApi(updateProductError);
  useErrorHandlerApi(deleteProductError);

  const handleAddProduct = async ({
    nameProduct,
    category_id,
    priceProduct,
    quantityProduct,
    user_id,
  }: AddProductType): Promise<boolean> => {
    try {
      const success = await addProduct({
        name: nameProduct,
        category_id: category_id,
        price: priceProduct,
        quantity: quantityProduct,
        last_op_id: user_id,
      });
      if (success) {
        showToast("success", `${nameProduct} added successfully!`);
        return true;
      }
      throw new Error(`Add failed for : ${addProductError}`);
    } catch (error) {
      // const errMsg = (error as Error).message;
      // showToast("error", `Error: ${errMsg}`);
      console.error(error);
      return false;
    }
  };

  const handleUpdateProduct = async ({
    product_id,
    nameProduct,
    category_id,
    priceProduct,
    quantityProduct,
    user_id,
  }: UpdateProductType): Promise<boolean> => {
    try {
      const success = await updateProduct({
        id: product_id,
        name: nameProduct,
        category_id: category_id,
        price: priceProduct,
        quantity: quantityProduct,
        last_op_id: user_id,
      });
      if (success) {
        showToast("success", `${nameProduct} updated successfully!`);
        return true;
      }
      throw new Error(`Update failed for : ${updateProductError}`);
    } catch (error) {
      // const errMsg = (error as Error).message;
      // showToast("error", `Error: ${errMsg}`);
      console.error(error);
      return false;
    }
  };

  const handleDeleteProduct = async (product_id: string): Promise<boolean> => {
    try {
      const success = await deleteProduct({ id: product_id });
      if (success) {
        showToast("success", `${product_id} deleted successfully!`);
        return true;
      }
      throw new Error(`Delete failed for : ${deleteProductError}`);
    } catch (error) {
      // const errMsg = (error as Error).message;
      // showToast("error", `Error: ${errMsg}`);
      console.error(error);
      return false;
    }
  };

  return {
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  };
}

export default useProductActions;
