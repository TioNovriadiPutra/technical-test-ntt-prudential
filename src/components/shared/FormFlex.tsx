import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onSubmit?: () => void;
};

const FormFlex = ({ children, className, style, onSubmit }: Props) => {
  return (
    <form
      className={`flex flex-col ${className}`}
      style={style}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default FormFlex;
