import { CustomSkeleton, Flex } from "../shared";

const UserProfileSkeleton = () => {
  return (
    <Flex className="flex-row! items-center px-2.5 py-3.5 border-t border-t-neutral-200">
      <Flex className="flex-1 flex-row! items-center p-1.5 gap-3">
        <CustomSkeleton width={40} height={40} borderRadius={8} />

        <Flex className="flex-1 gap-0.5">
          <CustomSkeleton height={17} borderRadius={8} />

          <CustomSkeleton height={15} borderRadius={8} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserProfileSkeleton;
