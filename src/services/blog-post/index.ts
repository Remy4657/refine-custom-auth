import { axiosInstance } from "@/lib";

export const deleteProducts = async (id: string) => {
  try {
    const res = await axiosInstance.delete("admin/product/delete", {
      data: { id: id },
    });
    return res;
  } catch (error) {
    console.log("error: ", error);
  }
};
export const editProducts = async (id: any, status: string, name: string) => {
  try {
    const res = await axiosInstance.put("admin/product/update", {
      id,
      status,
      name,
    });
    return res;
  } catch (error) {
    console.error("Error updating product:", error);
  }
};
export const createProducts = async (
  name: string,
  price: string,
  priceOld: string
) => {
  try {
    const res = await axiosInstance.post("admin/product/create", {
      name,
      price,
      priceOld,
    });
    return res;
  } catch (error) {
    console.error("Error create product:", error);
  }
};
