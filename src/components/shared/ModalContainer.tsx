import { AnimatePresence, motion } from "motion/react";
import Flex from "./Flex";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  show: boolean;
};

const ModalContainer = ({ children, className, show }: Props) => {
  return (
    <AnimatePresence>
      {show && (
        <Flex className="absolute w-dvw h-dvh bg-modal items-center justify-center z-10">
          <motion.div
            className={`relative min-w-95 bg-white rounded-lg shadow-[2px_2px_14px_0px_rgba(0,0,0,0.15)] ${className}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, ease: "circInOut" }}
          >
            {children}
          </motion.div>
        </Flex>
      )}
    </AnimatePresence>
  );
};

export default ModalContainer;
