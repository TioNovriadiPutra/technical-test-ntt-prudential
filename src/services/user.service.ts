import { getUserInfo } from "@/api/user.api";
import useHelper from "@/hooks/useHelper";
import type { UserProfileType } from "@/types/page.type";
import { capitalizeString } from "@/utils/helper/stringHandler";
import { useQuery } from "@tanstack/react-query";

const useUserService = () => {
  const { onError } = useHelper();

  const useGetUserInfoService = () => {
    const { data, isLoading, isError, error } = useQuery({
      queryKey: ["getUserInfo"],
      queryFn: () => getUserInfo(),
    });

    let finalData: UserProfileType = {
      profilePic: "",
      fullName: "",
      roleName: "",
    };

    if (!isLoading) {
      if (isError) {
        onError(error.message);
      } else if (data) {
        finalData = {
          profilePic: data.data.image,
          fullName: `${data.data.firstName} ${data.data.lastName}`,
          roleName: capitalizeString(data.data.role),
        };
      }
    }

    return {
      finalData,
      isLoading,
    };
  };

  return {
    useGetUserInfoService,
  };
};

export default useUserService;
