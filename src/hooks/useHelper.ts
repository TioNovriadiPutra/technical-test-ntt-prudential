import { useLoadingButton, useToast } from "@/stores/page.store";
import { useNavigate } from "react-router";

const useHelper = () => {
  const { showLoading, hideLoading } = useLoadingButton();
  const { showToast } = useToast();

  const nav = useNavigate();

  const onMutate = () => showLoading();

  const onSettled = () => hideLoading();

  const onSuccess = (message: string) => showToast("success", message);

  const onError = (message: string) => showToast("error", message);

  return {
    nav,
    onMutate,
    onSettled,
    onSuccess,
    onError,
  };
};

export default useHelper;
