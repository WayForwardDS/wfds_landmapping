import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

type SwitchProps = {
  checked?: boolean;
  onChange?: (val: boolean) => void;
  label?: string;
  tooltip?: string;
  icon?: boolean;
};

export function Switch({ checked = false, onChange, label, tooltip, icon = true }: SwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);

  // Sync internal state with external changes
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const toggle = () => {
    const newVal = !isChecked;
    setIsChecked(newVal);
    onChange?.(newVal);
  };

  return (
    <div className="flex items-center gap-2" title={tooltip}>
      {label && (
        <span className="text-sm text-gray-700 select-none dark:text-gray-300">{label}</span>
      )}
      <button
        onClick={toggle}
        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
          isChecked ? "bg-cyan-600" : "bg-gray-300 dark:bg-gray-600"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`inline-block h-5 w-5 bg-white rounded-full shadow-md transform flex items-center justify-center text-[10px] text-cyan-700 ${
            isChecked ? "translate-x-5" : "translate-x-1"
          }`}
        >
          {icon && (
            isChecked ? (
              <Check className="w-3 h-3 text-cyan-600" />
            ) : (
              <X className="w-3 h-3 text-gray-500" />
            )
          )}
        </motion.span>
      </button>
    </div>
  );
}
