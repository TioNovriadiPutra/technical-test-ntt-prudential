import type {
  DeleteModalType,
  DetailModalType,
  LoadingStateType,
  ToastStateType,
} from "@/types/state.type";
import { create } from "zustand";

export const useLoadingButton = create<LoadingStateType>((set) => ({
  show: false,
  showLoading: () => set({ show: true }),
  hideLoading: () => set({ show: false }),
}));

export const useToast = create<ToastStateType>((set) => ({
  show: false,
  variant: "error",
  message: "",
  showToast: (variant, message) => set({ show: true, variant, message }),
  hideToast: () => set({ show: false, variant: "error", message: "" }),
}));

export const useDeleteModal = create<DeleteModalType>((set) => ({
  show: false,
  id: 0,
  name: "",
  showModal: (id, name) => set({ show: true, id, name }),
  hideModal: () => set({ show: false, id: 0, name: "" }),
}));

export const useDetailModal = create<DetailModalType>((set) => ({
  show: false,
  data: null,
  showModal: (data) => set({ show: true, data }),
  hideModal: () => set({ show: false, data: null }),
}));
