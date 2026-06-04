import type { ProductDataDTO } from "./product.type";

export type AuthStateType = {
  access: string;
  refresh: string;
  addToken: (access: string, refresh: string) => void;
  removeToken: () => void;
  checkIsLoggedIn: () => void;
};

export type LoadingStateType = {
  show: boolean;
  showLoading: () => void;
  hideLoading: () => void;
};

export type ToastStateType = {
  show: boolean;
  variant: "success" | "error";
  message: string;
  showToast: (variant: "success" | "error", message: string) => void;
  hideToast: () => void;
};

export type DeleteModalType = {
  show: boolean;
  id: number;
  name: string;
  showModal: (id: number, name: string) => void;
  hideModal: () => void;
};

export type DetailModalType = {
  show: boolean;
  data: ProductDataDTO | null;
  showModal: (data: ProductDataDTO) => void;
  hideModal: () => void;
};
