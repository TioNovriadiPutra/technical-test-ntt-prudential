import { SearchInput } from "@/components/custom";
import { CustomButton, Flex, Table } from "@/components/shared";
import { Ripples } from "ldrs/react";
import { Controller, useForm, useWatch } from "react-hook-form";
import "ldrs/react/Ripples.css";
import useProductService from "@/services/product.service";
import { useNavigate } from "react-router";
import { useDeleteModal } from "@/stores/page.store";

const Product = () => {
  const showDeleteModal = useDeleteModal((state) => state.showModal);

  const { control } = useForm<{ search: "" }>({
    defaultValues: {
      search: "",
    },
  });

  const search = useWatch({
    control,
  });

  const nav = useNavigate();

  const { useGetProductsService, getProductDetailService } =
    useProductService();

  const { finalData, isLoading, isFetching, onHandleNext, onHandlePrev } =
    useGetProductsService(search.search || "");

  return (
    <Flex className="grow basis-0 px-6 py-3.5 gap-3.5 overflow-auto">
      <Flex className="flex-row! items-center justify-between">
        <Flex className="flex-row! items-center gap-2.5">
          <Controller
            control={control}
            name="search"
            render={({ field }) => <SearchInput field={field} />}
          />
        </Flex>

        <CustomButton
          label="Add Product"
          size="md"
          onClick={() => nav("/products/create")}
        />
      </Flex>

      <Flex className="flex-1 border border-neutral-200 rounded-lg shadow-sm">
        <Flex className="p-6 gap-1">
          <h1 className="text-neutral-900">Product</h1>

          <p className="text-sm text-neutral-500">Access product information</p>
        </Flex>

        {isLoading || isFetching ? (
          <Flex className="flex-1 items-center justify-center">
            <Ripples size="70" speed="2" color="var(--neutral-800)" />
          </Flex>
        ) : (
          <Table
            tableData={finalData}
            onNext={onHandleNext}
            onPrev={onHandlePrev}
            onEdit={(id) => nav(`/products/edit/${id}`)}
            onDelete={(id, name) => showDeleteModal(id, name)}
            onDetail={getProductDetailService}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default Product;
