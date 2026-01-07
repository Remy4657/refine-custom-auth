import { axiosInstance } from "@/lib";

export const changePasswords = async (
  email: string,
  oldPass: string,
  newPass: string
) => {
  try {
    const res = await axiosInstance.post("user/change-password", {
      email,
      oldPass,
      newPass,
    });
    return res;
  } catch (error) {
    console.error("Error create product:", error);
  }
};
