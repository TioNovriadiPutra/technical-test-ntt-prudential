import type {
  ProductDataDTO,
  ProductDTO,
  ProductInput,
} from "@/types/product.type";
import type { ResType } from "@/types/res.type";
import { axiosInstance } from "@/utils/config/axios";
import { errorResponse, successResponse } from "@/utils/helper/responseHandle";

export const getProducts = async (
  skip: number,
  search: string,
): Promise<ResType<ProductDTO>> => {
  try {
    const response = await axiosInstance.get(
      `/products${search ? "/search" : ""}?${search ? `q=${search}&` : ""}limit=10&skip=${skip}`,
    );

    return successResponse<ProductDTO>(response, "Data fetched!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const addProduct = async (
  body: ProductInput,
): Promise<ResType<ProductDTO>> => {
  try {
    const response = await axiosInstance.post("/products/add", {
      ...body,
      category: body.category ? body.category.value : "",
    });

    return successResponse<ProductDTO>(
      response,
      "Product added!|Product added successfully!",
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const getProductById = async (
  id: number,
): Promise<ResType<ProductDataDTO>> => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);

    return successResponse<ProductDataDTO>(response, "Data fetched!");
  } catch (error) {
    throw errorResponse(error);
  }
};

export const updateProduct = async (
  body: ProductInput,
  id: number,
): Promise<ResType<ProductDataDTO>> => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, {
      ...body,
      category: body.category ? body.category.value : "",
    });

    return successResponse<ProductDataDTO>(
      response,
      "Product updated!|Product updated successfully!",
    );
  } catch (error) {
    throw errorResponse(error);
  }
};

export const deleteProduct = async (
  id: number,
): Promise<ResType<ProductDataDTO>> => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);

    return successResponse(
      response,
      "Product deleted!|Product deleted successfully!",
    );
  } catch (error) {
    throw errorResponse(error);
  }
};
