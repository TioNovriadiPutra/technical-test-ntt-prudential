import type { CategoryDTO } from "@/types/category.type";
import type { ResType } from "@/types/res.type";
import { axiosInstance } from "@/utils/config/axios";
import { errorResponse, successResponse } from "@/utils/helper/responseHandle";

export const getCategories = async (): Promise<ResType<CategoryDTO[]>> => {
  try {
    const response = await axiosInstance.get("/products/categories");

    return successResponse<CategoryDTO[]>(response, "Data fetched!");
  } catch (error) {
    throw errorResponse(error);
  }
};
