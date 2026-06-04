import { AnimatePresence, motion } from "motion/react";
import { Flex } from "../shared";
import { useDetailModal } from "@/stores/page.store";
import { CloseCircle } from "iconsax-reactjs";
import { convertNumberToCurrency } from "@/utils/helper/stringHandler";

const DetailModal = () => {
  const { show, data, hideModal } = useDetailModal();

  return (
    <AnimatePresence>
      {show && data && (
        <Flex className="absolute w-dvw h-dvh bg-modal items-end z-10">
          <motion.div
            className={`relative flex flex-col w-98.25 h-dvh border-r border-r-neutral-200 bg-white shadow-[2px_2px_14px_0px_rgba(0,0,0,0.15)] overflow-hidden`}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "circInOut" }}
          >
            <Flex className="flex-row! items-center px-6 py-4.5 border-b border-b-neutral-200 gap-3.5">
              <button
                type="button"
                className="size-6 bg-neutral-0 hover:bg-neutral-200 duration-300 transition-colors rounded-md"
                onClick={hideModal}
              >
                <CloseCircle
                  size={16}
                  color="var(--neutral-500)"
                  strokeWidth={1.25}
                />
              </button>

              <p className="text-md font-semibold text-neutral-900">
                Product Information
              </p>
            </Flex>

            <Flex className="grow basis-0 px-9 py-4.5 gap-6 overflow-auto">
              <Flex className="w-full h-64">
                <img
                  src={data.thumbnail}
                  alt="Thumbnail"
                  className="w-full h-full object-cover rounded-lg"
                />
              </Flex>

              <Flex className="pb-5.5 border-b border-b-neutral-200">
                <h3 className="text-xl font-semibold text-[#1F2937] mb-2">
                  {data.title}
                </h3>

                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]">
                    {data.category}
                  </span>
                </div>
                <div className="text-sm text-[#6B7280]">{data.brand}</div>
              </Flex>

              <Flex className="gap-4.5 pb-5.5 border-b border-b-neutral-200">
                <Flex className="flex-row! items-center justify-between">
                  <p className="text-sm text-neutral-600">SKU</p>

                  <p className="text-sm text-neutral-900">{data.sku}</p>
                </Flex>

                <Flex className="flex-row! items-center justify-between">
                  <p className="text-sm text-neutral-600">Price</p>

                  <p className="text-sm text-neutral-900">
                    {convertNumberToCurrency(data.price)}
                  </p>
                </Flex>

                <Flex className="flex-row! items-center justify-between">
                  <p className="text-sm text-neutral-600">Discount</p>

                  <p className="text-sm text-neutral-900">
                    {data.discountPercentage}%
                  </p>
                </Flex>

                <Flex className="flex-row! items-center justify-between">
                  <p className="text-sm text-neutral-600">Stock</p>

                  <p className="text-sm text-neutral-900">{data.stock} Unit</p>
                </Flex>

                <Flex className="flex-row! items-center justify-between">
                  <p className="text-sm text-neutral-600">Status</p>

                  <p className="text-sm text-neutral-900">
                    {data.availabilityStatus}
                  </p>
                </Flex>

                <Flex className="flex-row! items-center justify-between">
                  <p className="text-sm text-neutral-600">Weight</p>

                  <p className="text-sm text-neutral-900">{data.weight} kg</p>
                </Flex>

                <Flex className="flex-row! items-center justify-between">
                  <p className="text-sm text-neutral-600">Dimention</p>

                  <p className="text-sm text-neutral-900">
                    {data.dimensions.width} x {data.dimensions.height} x
                    {data.dimensions.depth} cm
                  </p>
                </Flex>
              </Flex>

              <Flex className="gap-4.5">
                <p className="text-sm text-neutral-600">Description</p>

                <p className="text-sm text-neutral-900">{data.description}</p>
              </Flex>
            </Flex>
          </motion.div>
        </Flex>
      )}
    </AnimatePresence>
  );
};

export default DetailModal;
