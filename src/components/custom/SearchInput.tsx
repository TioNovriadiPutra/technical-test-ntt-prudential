import { SearchNormal1 } from "iconsax-reactjs";
import { Flex } from "../shared";
import type { ControllerRenderProps } from "react-hook-form";

type Props = {
  field: ControllerRenderProps<any, any>;
};

const SearchInput = ({ field }: Props) => {
  return (
    <Flex className="flex-row! items-center px-3 py-1.75 border border-neutral-200 w-[320px] rounded-md gap-2">
      <SearchNormal1 size={18} color="var(--neutral-500)" strokeWidth={1.25} />

      <input {...field} placeholder="Search..." />
    </Flex>
  );
};

export default SearchInput;
