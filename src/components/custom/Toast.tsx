import { useToast } from "@/stores/page.store";
import { CloseCircle, TickCircle } from "iconsax-reactjs";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { Flex } from "../shared";

const Toast = () => {
  const { show, variant, message, hideToast } = useToast();

  const arrMess = message ? message.split("|") : ["", ""];

  useEffect(() => {
    let timeout: number;

    if (show) {
      timeout = setTimeout(() => {
        hideToast();
      }, 4000);
    }

    return () => clearTimeout(timeout);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute z-10 right-6 bottom-6 min-w-90 bg-white shadow-[0px_2px_15px_0px_rgba(0,0,0,0.15)] px-6 py-4.5 rounded-md border border-neutral-200 flex flex-row! items-center gap-3.5"
          initial={{
            opacity: 0,
            x: "100%",
          }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.2, ease: "circInOut" }}
        >
          <Flex
            className={`size-10 rounded-full items-center justify-center ${
              variant === "success" ? "bg-green-200" : "bg-red-100"
            }`}
          >
            {variant === "success" ? (
              <TickCircle size={14} color="#16A34A" />
            ) : (
              <CloseCircle size={14} color="#DC2626" />
            )}
          </Flex>

          <Flex className="gap-1.5 flex-1">
            <p className="text-xs font-semibold text-neutral-900">
              {arrMess[0]}
            </p>

            <p className="text-xs text-neutral-900">{arrMess[1]}</p>
          </Flex>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
