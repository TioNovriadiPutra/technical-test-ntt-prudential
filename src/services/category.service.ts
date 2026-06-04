import { getCategories } from "@/api/category.api";
import useHelper from "@/hooks/useHelper";
import type { DropdownType } from "@/types/page.type";
import { useQuery } from "@tanstack/react-query";

const useCategoryService = () => {
  const { onError } = useHelper();

  const useGetCategoriesService = () => {
    const { data, isLoading, isError, error } = useQuery({
      queryKey: ["getCategories"],
      queryFn: () => getCategories(),
    });

    let finalData: DropdownType[] = [];

    if (!isLoading) {
      if (isError) {
        onError(error.message);
      } else if (data) {
        finalData = data.data.map((item) => ({
          label: item.name,
          value: item.slug,
        }));
      }
    }

    return {
      finalData,
      isLoading,
    };
  };

  return {
    useGetCategoriesService,
  };
};

export default useCategoryService;
