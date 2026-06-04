import type { LoginDTO, LoginInput, RefreshTokenDTO } from "@/types/auth.type";
import type { ResType } from "@/types/res.type";
import { axiosInstance } from "@/utils/config/axios";
import { errorResponse, successResponse } from "@/utils/helper/responseHandle";

export const login = async (body: LoginInput): Promise<ResType<LoginDTO>> => {
  try {
    const response = await axiosInstance.post("/auth/login", body);

    return successResponse<LoginDTO>(
      response,
      "Login berhasil!|Selamat bekerja!",
    );
  } catch (error) {
    throw errorResponse(error, "Login Gagal!|Email atau password salah!");
  }
};

export const refreshToken = async (
  refresh: string,
): Promise<ResType<RefreshTokenDTO>> => {
  try {
    const response = await axiosInstance.post("/auth/refresh", {
      refreshToken: refresh,
    });

    return successResponse<RefreshTokenDTO>(
      response,
      "Token berhasil di refresh!",
    );
  } catch (error) {
    throw errorResponse(error);
  }
};
