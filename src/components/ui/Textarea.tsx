// src/components/ui/Textarea.tsx

import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
