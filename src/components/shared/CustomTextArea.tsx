import type { ControllerRenderProps, FieldError } from "react-hook-form";
import Flex from "./Flex";

type Props = {
  field: ControllerRenderProps<any, any>;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  error?: FieldError;
};

const CustomTextArea = ({
  field,
  label,
  isRequired,
  placeholder = "Input here...",
  error,
}: Props) => {
  return (
    <Flex className="flex-1 gap-2">
      {label && (
        <p className="text-sm font-medium text-neutral-900">
          {label}
          {isRequired && <span className="text-red-500"> *</span>}
        </p>
      )}

      <Flex
        className={`px-3 py-[11.5px] border border-neutral-200 rounded-md gap-4 h-50 focus-within:ring-4 ${
          error ? "focus-within:ring-red-100" : "focus-within:ring-neutral-100"
        } transition-all duration-200 ${
          error ? "border-red-600" : "border-neutral-200"
        }`}
      >
        <textarea {...field} placeholder={placeholder}></textarea>
      </Flex>

      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </Flex>
  );
};

export default CustomTextArea;
