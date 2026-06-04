import { Controller, type Control } from "react-hook-form";
import { CustomButton, CustomTextInput, Flex, FormFlex } from "../shared";
import type { LoginInput } from "@/types/auth.type";
import { useLoadingButton } from "@/stores/page.store";

type Props = {
  control: Control<LoginInput, any, LoginInput>;
  onSubmit: () => void;
};

const LoginForm = ({ control, onSubmit }: Props) => {
  const isLoading = useLoadingButton((state) => state.show);

  return (
    <FormFlex className="gap-12" onSubmit={onSubmit}>
      <Flex className="gap-6">
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <CustomTextInput field={field} placeholder="Username" />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <CustomTextInput
              field={field}
              placeholder="Password"
              type="password"
            />
          )}
        />
      </Flex>

      <CustomButton
        label="Sign In"
        type="submit"
        isLoading={isLoading}
        onClick={onSubmit}
      />
    </FormFlex>
  );
};

export default LoginForm;
