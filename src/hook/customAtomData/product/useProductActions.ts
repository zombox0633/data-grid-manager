import { useAtom } from "jotai";

import {
  updateProductAtom,
  updateProductErrorAtom,
} from "atoms/productAtom/updateProductAtom";
import {
  addProductAtom,
  addProductErrorAtom,
} from "atoms/productAtom/addProductAtom";
import {
  deleteProductAtom,
  deleteProductErrorAtom,
} from "atoms/productAtom/deleteProductAtom";

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
  const [, updateProduct] = useAtom(updateProductAtom);
  const [updateProductError] = useAtom(updateProductErrorAtom);
  const [, deleteProduct] = useAtom(deleteProductAtom);
  const [deleteProductError] = useAtom(deleteProductErrorAtom);

  const handleAddProduct = async ({
    nameProduct,
    category_id,
    priceProduct,
    quantityProduct,
    user_id,
  }: AddProductType) => {
    try {
      const success = await addProduct({
        name: nameProduct,
        category_id: category_id,
        price: priceProduct,
        quantity: quantityProduct,
        last_op_id: user_id,
      });
      if (!success) {
        throw new Error(`Add failed for : ${addProductError}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProduct = async ({
    product_id,
    nameProduct,
    category_id,
    priceProduct,
    quantityProduct,
    user_id,
  }: UpdateProductType) => {
    try {
      const success = await updateProduct({
        id: product_id,
        name: nameProduct,
        category_id: category_id,
        price: priceProduct,
        quantity: quantityProduct,
        last_op_id: user_id,
      });
      if (!success) {
        throw new Error(`Update failed for : ${updateProductError}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (product_id:string) => {
    try {
      const success = await deleteProduct({ id: product_id });
      if (!success) {
        throw new Error(`Delete failed for : ${deleteProductError}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  };
}

export default useProductActions;
