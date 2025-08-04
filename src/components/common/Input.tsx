import { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type InputProps = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        type={props.type || "text"}
        className={cn(
          "w-full px-4 py-2 text-sm border rounded-md shadow-sm dark:bg-slate-900 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500",
          className
        )}
        {...props}
      />
    </div>
  );
}
