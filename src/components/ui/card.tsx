// src/components/ui/card.tsx
import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => (
  <div className={`rounded-2xl border shadow-sm bg-white dark:bg-slate-900 dark:border-slate-700 ${className}`}>
    {children}
  </div>
);

type CardContentProps = {
  children: ReactNode;
  className?: string;
};

export const CardContent = ({ children, className = "" }: CardContentProps) => (
  <div className={`p-4 ${className}`}>{children}</div>
);
