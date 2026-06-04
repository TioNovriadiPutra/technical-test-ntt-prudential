import type { ResType } from "@/types/res.type";
import type { UserDTO } from "@/types/user.type";
import { axiosInstance } from "@/utils/config/axios";
import { errorResponse, successResponse } from "@/utils/helper/responseHandle";

export const getUserInfo = async (): Promise<ResType<UserDTO>> => {
  try {
    const response = await axiosInstance.get("/auth/me");

    return successResponse<UserDTO>(response, "Data fetched!");
  } catch (error) {
    throw errorResponse(error);
  }
};
