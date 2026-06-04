import { CloseCircle, Danger } from "iconsax-reactjs";
import { CustomButton, Flex, ModalContainer } from "../shared";
import { useDeleteModal, useLoadingButton } from "@/stores/page.store";
import useProductService from "@/services/product.service";

const ConfirmationModal = () => {
  const isLoading = useLoadingButton((state) => state.show);

  const { show, id, name, hideModal } = useDeleteModal();

  const { deleteProductService } = useProductService();

  return (
    <ModalContainer show={show} className="max-w-95">
      <Flex className="flex-row! items-center justify-between px-6 py-4 border-b border-b-neutral-200">
        <p className="text-md font-semibold text-neutral-900">
          Delete this item?
        </p>

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
      </Flex>

      <Flex className="px-6 py-4.5 gap-4.5">
        <p className="text-sm font-medium text-neutral-800">"{name}"</p>

        <p className="text-sm text-neutral-500">
          We will delete this data from the system. Continue?
        </p>

        <Flex className="flex-row! items-center p-3.5 gap-2.5 bg-red-100 rounded-lg text-red-500">
          <Danger size={18} />

          <p className="text-xs">
            This action will permanently delete the data and cannot be undone.
          </p>
        </Flex>
      </Flex>

      <Flex className="flex-row! justify-end gap-3.5 px-6 py-3.5">
        <CustomButton
          label="Cancel"
          variant="outline"
          onClick={hideModal}
          isLoading={isLoading}
        />

        <CustomButton
          label="Delete"
          onClick={() => deleteProductService(id)}
          isLoading={isLoading}
        />
      </Flex>
    </ModalContainer>
  );
};

export default ConfirmationModal;
