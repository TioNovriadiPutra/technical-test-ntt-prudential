import { LoginForm } from "@/components/custom";
import { Flex } from "@/components/shared";
import useAuthService from "@/services/auth.service";
import type { LoginInput } from "@/types/auth.type";
import { useForm } from "react-hook-form";

const Login = () => {
  const { control, handleSubmit } = useForm<LoginInput>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { loginService } = useAuthService();

  return (
    <Flex className="flex-1 items-center justify-center gap-16">
      <Flex className="gap-3.5 items-center max-w-84">
        <h1 className="text-neutral-900 text-center">Selamat Datang</h1>

        <p className="text-sm text-neutral-500 text-center">
          Masukan email dan password yang telah terdaftar untuk masuk
        </p>
      </Flex>

      <Flex className="w-95">
        <LoginForm control={control} onSubmit={handleSubmit(loginService)} />
      </Flex>
    </Flex>
  );
};

export default Login;
