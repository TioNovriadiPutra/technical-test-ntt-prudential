import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {
  width?: number | string;
  height?: number | string;
  isCircle?: boolean;
  borderRadius?: number;
};

const CustomSkeleton = ({ width, height, isCircle, borderRadius }: Props) => {
  return (
    <Skeleton
      width={width}
      height={height}
      circle={isCircle}
      borderRadius={borderRadius}
    />
  );
};

export default CustomSkeleton;
