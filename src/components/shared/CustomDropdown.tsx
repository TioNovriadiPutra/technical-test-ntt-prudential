import type { ControllerRenderProps, FieldError } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import type { DropdownType } from "@/types/page.type";

type Props = {
  field: ControllerRenderProps<any, any>;
  items: DropdownType[];
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  error?: FieldError;
};

const CustomDropdown = ({
  field,
  items,
  label,
  isRequired,
  placeholder = "Select here...",
  error,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<DOMRect | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !wrapperRef.current?.contains(event.target as Node) &&
        !dropdownRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside, true);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="flex flex-col flex-1 gap-2 relative">
      {label && (
        <p className="text-sm font-medium text-neutral-900">
          {label}
          {isRequired && <span className="text-red-500"> *</span>}
        </p>
      )}

      <button
        type="button"
        className={`justify-start! px-3 py-[11.5px] border focus-within:ring-4 ${
          error ? "focus-within:ring-red-100" : "focus-within:ring-neutral-100"
        } rounded-md transition-all duration-200 ${
          error ? "border-red-600" : "border-neutral-200"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
          setCoords(rect);
          setOpen((prev) => !prev);
        }}
      >
        <p
          className={`flex-1 text-left text-sm ${
            field.value ? "text-neutral-800" : "text-neutral-400"
          }`}
        >
          {field.value ? field.value.label : placeholder}
        </p>
      </button>

      {error && <p className="text-sm text-red-600">{error.message}</p>}

      {createPortal(
        <AnimatePresence>
          {open && coords && (
            <motion.div
              ref={dropdownRef}
              className="flex flex-col fixed p-1.25 border border-neutral-200 rounded-md min-w-30.25 z-10 bg-white max-h-50 overflow-auto origin-top"
              style={{
                top: coords.bottom + 5,
                left: coords.left,
                width: coords.width,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, ease: "circInOut" }}
            >
              {items.map((btn, index) => (
                <button
                  key={index.toString()}
                  className="p-2 justify-start! hover:bg-neutral-200 transition-colors duration-300 rounded-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    field.onChange(btn);
                    setOpen(false);
                  }}
                >
                  <p className="text-sm text-neutral-900">{btn.label}</p>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
};

export default CustomDropdown;
