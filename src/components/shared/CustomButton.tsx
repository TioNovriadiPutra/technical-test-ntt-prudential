import { Squircle } from "ldrs/react";
import "ldrs/react/Squircle.css";

type Props = {
  label: string;
  size?: "lg" | "md";
  variant?: "default" | "outline";
  type?: "submit" | "reset" | "button";
  isLoading?: boolean;
  onClick?: () => void;
};

const CustomButton = ({
  label,
  size = "lg",
  variant = "default",
  type = "button",
  isLoading,
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      className={`rounded-md text-sm font-medium px-3 ${size === "md" ? "py-1.75" : "py-2.75"} ${variant === "outline" ? "bg-none border border-neutral-200 text-neutral-800 hover:bg-neutral-200" : "bg-primary-900 text-neutral-0 hover:bg-primary-700"} duration-300 transition-colors`}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
    >
      {isLoading ? (
        <Squircle
          size="16"
          stroke="2"
          strokeLength="0.25"
          bgOpacity="0.1"
          speed="0.8"
          color={
            variant === "outline" ? "var(--neutral-800)" : "var(--neutral-0)"
          }
        />
      ) : (
        label
      )}
    </button>
  );
};

export default CustomButton;
