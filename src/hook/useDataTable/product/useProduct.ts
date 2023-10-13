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

function useProduct() {
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

  const handleAddProduct = async ({
    nameProduct,
    category_id,
    priceProduct,
    quantityProduct,
    user_id,
  }: AddProductType): Promise<boolean> => {
    const missingFields: string[] = [];
    if (!nameProduct) missingFields.push("product name");
    if (!category_id) missingFields.push("category");
    if (!priceProduct) missingFields.push("price");
    if (!quantityProduct) missingFields.push("quantity");
    if (!user_id) missingFields.push("register");

    if (missingFields.length) {
      showToast("error", `Missing fields: ${missingFields.join(", ")}`);
      return false;
    }

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
    const missingFields: string[] = [];
    if (!product_id) missingFields.push("product id");
    if (!user_id) missingFields.push("register");

    if (missingFields.length) {
      showToast("error", `Missing fields: ${missingFields.join(", ")}`);
      return false;
    }

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
      console.error(error);
      return false;
    }
  };

  const handleDeleteProduct = async (
    product_id: string,
    nameProduct: string
  ): Promise<boolean> => {
    const missingFields: string[] = [];
    if (!product_id) missingFields.push("product id");
    if (!nameProduct) missingFields.push("product name");

    if (missingFields.length) {
      showToast("error", `Missing fields: ${missingFields.join(", ")}`);
      return false;
    }

    try {
      const success = await deleteProduct({ id: product_id });
      if (success) {
        showToast("success", `${nameProduct} deleted successfully!`);
        return true;
      }
      throw new Error(`Delete failed for : ${deleteProductError}`);
    } catch (error) {
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

export default useProduct;
//push ใส่
//join(",") ต่อ
