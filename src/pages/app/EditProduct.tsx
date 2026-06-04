import {
  CustomButton,
  CustomDropdown,
  CustomTextArea,
  CustomTextInput,
  Flex,
} from "@/components/shared";
import useCategoryService from "@/services/category.service";
import useProductService from "@/services/product.service";
import { useLoadingButton } from "@/stores/page.store";
import type { ProductInput } from "@/types/product.type";
import { ArrowLeft2 } from "iconsax-reactjs";
import { Ripples } from "ldrs/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

const EditProduct = () => {
  const { id } = useParams();

  const isLoadingButton = useLoadingButton((state) => state.show);

  const nav = useNavigate();

  const { control, handleSubmit, reset } = useForm<ProductInput>({
    defaultValues: {
      title: "",
      description: "",
      category: undefined,
      brand: "",
      sku: "",
    },
  });

  const { useGetCategoriesService } = useCategoryService();
  const { useGetProductByIdService, updateProductService } =
    useProductService();

  const { finalData, isLoading } = useGetCategoriesService();
  const {
    finalData: product,
    isLoading: productLoading,
    isFetching: productFetching,
  } = useGetProductByIdService(id ? Number(id) : 0);

  useEffect(() => {
    if (!productFetching) {
      reset(product);
    }
  }, [productFetching]);

  return (
    <Flex className="flex-1 pt-3.5 gap-11 overflow-auto">
      <Flex className="flex-row! items-center gap-4 pt-2 px-6">
        <button
          type="button"
          className="size-8 rounded-md border border-neutral-200 bg-neutral-0 hover:bg-neutral-200 duration-300 transition-colors"
          onClick={() => nav(-1)}
        >
          <ArrowLeft2 size={16} color="var(--neutral-900)" />
        </button>

        <h2 className="text-neutral-900">Edit Product</h2>
      </Flex>

      {isLoading || productLoading ? (
        <Flex className="grow basis-0 items-center justify-center">
          <Ripples size="70" speed="2" color="var(--neutral-800)" />
        </Flex>
      ) : (
        <Flex className="grow basis-0 flex-row! px-6 gap-6">
          <Flex className="flex-1 max-w-80">
            <p className="text-md font-semibold text-neutral-800">
              Basic Information
            </p>

            <p className="text-sm text-neutral-500">
              Fill in the essential details of your product, including its name,
              description, category, and brand.
            </p>
          </Flex>

          <Flex className="flex-1">
            <div className="grid grid-cols-2 gap-7">
              <Flex className="col-span-1">
                <Controller
                  control={control}
                  name="title"
                  rules={{
                    required: "Product name must be filled!",
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextInput
                      field={field}
                      label="Product Name"
                      isRequired
                      error={error}
                    />
                  )}
                />
              </Flex>

              <Flex className="col-span-1">
                <Controller
                  control={control}
                  name="brand"
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextInput
                      field={field}
                      label="Brand"
                      error={error}
                    />
                  )}
                />
              </Flex>

              <Flex className="col-span-1">
                <Controller
                  control={control}
                  name="category"
                  rules={{
                    required: "Category must be filled!",
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <CustomDropdown
                      field={field}
                      items={finalData}
                      label="Category"
                      isRequired
                      error={error}
                    />
                  )}
                />
              </Flex>

              <Flex className="col-span-1">
                <Controller
                  control={control}
                  name="sku"
                  rules={{
                    required: "SKU must be filled!",
                    validate: (value) =>
                      !value.includes(" ") || "SKU cannot contain space!",
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextInput
                      field={field}
                      label="SKU"
                      isRequired
                      error={error}
                    />
                  )}
                />
              </Flex>

              <Flex className="col-span-1">
                <Controller
                  control={control}
                  name="description"
                  rules={{
                    required: "Description must be filled!",
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextArea
                      field={field}
                      label="Description"
                      isRequired
                      error={error}
                    />
                  )}
                />
              </Flex>
            </div>
          </Flex>
        </Flex>
      )}

      <Flex className="flex-row! items-center justify-end py-4 px-6 border-t border-t-neutral-200 gap-2">
        <Flex className="w-25">
          <CustomButton
            label="Cancel"
            variant="outline"
            isLoading={isLoadingButton || isLoading}
          />
        </Flex>

        <Flex className="w-25">
          <CustomButton
            label="Save"
            isLoading={isLoadingButton || isLoading}
            onClick={handleSubmit((data) =>
              updateProductService({ body: data, id: id ? Number(id) : 0 }),
            )}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default EditProduct;
