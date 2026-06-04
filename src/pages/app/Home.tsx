import { Flex } from "@/components/shared";
import useUserService from "@/services/user.service";
import { Ripples } from "ldrs/react";
import "ldrs/react/Ripples.css";

const Home = () => {
  const { useGetUserInfoService } = useUserService();

  const { finalData, isLoading } = useGetUserInfoService();

  return (
    <Flex className="flex-1 items-center justify-center">
      \
      {isLoading ? (
        <Ripples size="70" speed="2" color="var(--neutral-800)" />
      ) : (
        <>
          <h1>Welcome</h1>

          <p>{finalData.fullName}</p>
        </>
      )}
    </Flex>
  );
};

export default Home;
