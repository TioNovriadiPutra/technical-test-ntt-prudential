import type { ResType } from "@/types/res.type";
import type { AxiosResponse } from "axios";
import axios from "axios";

export const successResponse = <T = any>(
  response: AxiosResponse,
  message: string,
): ResType<T> => {
  const data = response.data;

  return {
    success: true,
    message,
    data: data ?? {},
  };
};

export const errorResponse = (error: unknown, message?: string): ResType => {
  if (axios.isAxiosError(error)) {
    return {
      success: false,
      message: message ?? error.response!.data.message,
      data: {},
    };
  } else {
    return {
      success: false,
      message:
        "Terjadi kesalahan sistem!|Terjadi kesalahan pada sistem silahkan coba lagi!",
      data: {},
    };
  }
};
