import type { ControllerRenderProps, FieldError } from "react-hook-form";
import Flex from "./Flex";
import { useState, type HTMLInputTypeAttribute } from "react";
import { Eye, EyeSlash } from "iconsax-reactjs";

type Props = {
  field: ControllerRenderProps<any, any>;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  error?: FieldError;
};

const CustomTextInput = ({
  field,
  label,
  isRequired,
  placeholder,
  type = "text",
  error,
}: Props) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <Flex className="flex-1 gap-2">
      {label && (
        <p className="text-sm font-medium text-neutral-900">
          {label}
          {isRequired && <span className="text-red-500"> *</span>}
        </p>
      )}

      <Flex
        className={`flex-row items-center px-3 py-[11.5px] border rounded-md gap-4 focus-within:ring-4 ${
          error ? "focus-within:ring-red-100" : "focus-within:ring-neutral-100"
        } transition-all duration-200 ${
          error ? "border-red-600" : "border-neutral-200"
        }`}
      >
        <input
          {...field}
          type={type === "password" ? (showPass ? "text" : "password") : type}
          placeholder={placeholder || "Input here..."}
        />

        {type === "password" && (
          <button type="button" onClick={() => setShowPass((prev) => !prev)}>
            {showPass ? (
              <EyeSlash size={18} color="var(--neutral-500)" />
            ) : (
              <Eye size={18} color="var(--neutral-500)" />
            )}
          </button>
        )}
      </Flex>

      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </Flex>
  );
};

export default CustomTextInput;
