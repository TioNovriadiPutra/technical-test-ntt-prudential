import { login } from "@/api/auth.api";
import useHelper from "@/hooks/useHelper";
import { useAuth } from "@/stores/auth.store";
import type { LoginInput } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";

const useAuthService = () => {
  const { addToken } = useAuth();

  const { onMutate, onSettled, onSuccess, onError } = useHelper();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (body: LoginInput) => login(body),
    onMutate,
    onSettled,
    onSuccess: (response) => {
      localStorage.setItem("@access", response.data.accessToken);
      localStorage.setItem("@refresh", response.data.refreshToken);
      addToken(response.data.accessToken, response.data.refreshToken);
      onSuccess(response.message);
    },
    onError: (error) => onError(error.message),
  });

  return {
    loginService: (body: LoginInput) => loginMutation.mutate(body),
  };
};

export default useAuthService;
