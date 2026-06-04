import type { CSSProperties, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const Flex = ({ children, className, style }: Props) => {
  return (
    <div className={`flex flex-col ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Flex;
