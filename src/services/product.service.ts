import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "@/api/product.api";
import { useDebounce } from "@/hooks/useDebounce";
import useHelper from "@/hooks/useHelper";
import { useDeleteModal, useDetailModal } from "@/stores/page.store";
import type { TableType } from "@/types/page.type";
import type { ProductInput } from "@/types/product.type";
import {
  capitalizeString,
  convertNumberToCurrency,
} from "@/utils/helper/stringHandler";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useProductService = () => {
  const hideDeleteModal = useDeleteModal((state) => state.hideModal);
  const showDetailModal = useDetailModal((state) => state.showModal);

  const { nav, onMutate, onSettled, onSuccess, onError } = useHelper();

  const useGetProductsService = (search: string) => {
    const [skip, setSkip] = useState(0);

    const debounceSearch = useDebounce(search);

    const onHandleNext = () => setSkip((prev) => prev + 10);

    const onHandlePrev = () => setSkip((prev) => prev - 10);

    const { data, isLoading, isFetching, isError, error } = useQuery({
      queryKey: ["getProducts", skip, debounceSearch],
      queryFn: () => getProducts(skip, debounceSearch),
    });

    let finalData: TableType = {
      header: [
        "Product Name",
        "Category",
        "Brand",
        "SKU",
        "Price",
        "Rating",
        "Stock",
        "Status",
      ],
      row: [],
      meta: {
        total: 0,
        from: 0,
        to: 0,
      },
    };

    if (!isLoading) {
      if (isError) {
        onError(error.message);
      } else if (data) {
        finalData = {
          ...finalData,
          row: data.data.products.map((item) => ({
            id: item.id,
            data: [
              { value: item.title, variant: "text" },
              {
                value: item.tags.map((item) => capitalizeString(item)),
                variant: "badge",
              },
              { value: item.brand ?? "-", variant: "text" },
              { value: item.sku, variant: "text" },
              {
                value: convertNumberToCurrency(item.price),
                variant: "currency",
              },
              { value: item.rating.toString(), variant: "rating" },
              { value: item.stock.toString(), variant: "text" },
              {
                value: item.availabilityStatus,
                variant:
                  item.availabilityStatus === "In Stock"
                    ? "statusSuccess"
                    : item.availabilityStatus === "Low Stock"
                      ? "statusWarning"
                      : "statusFailed",
              },
            ],
          })),
          meta: {
            total: data.data.total,
            from: data.data.skip === 0 ? 1 : data.data.skip + 1,
            to:
              data.data.skip === 0
                ? data.data.limit
                : data.data.skip > data.data.total
                  ? data.data.total
                  : data.data.skip + 10,
          },
        };
      }
    }

    return {
      finalData,
      isLoading,
      isFetching,
      onHandleNext,
      onHandlePrev,
    };
  };

  const useGetProductByIdService = (id: number) => {
    const { data, isLoading, isFetching, isError, error } = useQuery({
      queryKey: ["getProductById"],
      queryFn: () => getProductById(id),
    });

    let finalData: ProductInput = {
      title: "",
      description: "",
      category: undefined,
      brand: "",
      sku: "",
    };

    if (!isLoading) {
      if (isError) {
        onError(error.message);
      } else if (data) {
        finalData = {
          title: data.data.title,
          description: data.data.description,
          category: {
            label: data.data.category,
            value: data.data.category.toLowerCase(),
          },
          brand: data.data.brand ?? "",
          sku: data.data.sku,
        };
      }
    }

    return {
      finalData,
      isLoading,
      isFetching,
    };
  };

  const addProductMutation = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: (body: ProductInput) => addProduct(body),
    onMutate,
    onSettled,
    onSuccess: (response) => {
      nav("/products", {
        replace: true,
      });
      onSuccess(response.message);
    },
    onError: (error) => onError(error.message),
  });

  const updateProductMutation = useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: (data: { body: ProductInput; id: number }) =>
      updateProduct(data.body, data.id),
    onMutate,
    onSettled,
    onSuccess: (response) => {
      nav("/products", {
        replace: true,
      });
      onSuccess(response.message);
    },
    onError: (error) => onError(error.message),
  });

  const deleteProductMutation = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: (id: number) => deleteProduct(id),
    onMutate,
    onSettled,
    onSuccess: (response) => {
      hideDeleteModal();
      onSuccess(response.message);
    },
    onError: (error) => onError(error.message),
  });

  const getProductDetailMutation = useMutation({
    mutationKey: ["getProductDetail"],
    mutationFn: (id: number) => getProductById(id),
    onMutate,
    onSettled,
    onSuccess: (response) => showDetailModal(response.data),
    onError: (error) => onError(error.message),
  });

  return {
    useGetProductsService,
    useGetProductByIdService,
    addProductService: (body: ProductInput) => addProductMutation.mutate(body),
    updateProductService: (data: { body: ProductInput; id: number }) =>
      updateProductMutation.mutate(data),
    deleteProductService: (id: number) => deleteProductMutation.mutate(id),
    getProductDetailService: (id: number) =>
      getProductDetailMutation.mutate(id),
  };
};

export default useProductService;
