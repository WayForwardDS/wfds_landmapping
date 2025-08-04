// src/components/ui/Tabs.tsx
import { useState, ReactNode } from "react";

type TabProps = {
  value: string;
  label: string;
};

type TabsContainerProps = {
  defaultValue: string;
  children: ReactNode;
  onTabChange?: (value: string) => void;
};

type TabContentProps = {
  value: string;
  activeValue: string;
  children: ReactNode;
};

export function Tabs({ defaultValue, children, onTabChange }: TabsContainerProps) {
  const [active, setActive] = useState(defaultValue);

  const handleTabClick = (value: string) => {
    setActive(value);
    onTabChange?.(value);
  };

  const tabs = Array.isArray(children)
    ? children.filter((child) => (child as any).type === Tab)
    : [];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b border-gray-300 dark:border-slate-700">
        {tabs.map((tab: any) => (
          <button
            key={tab.props.value}
            onClick={() => handleTabClick(tab.props.value)}
            className={`px-4 py-2 text-sm font-medium transition-all border-b-2 ${
              active === tab.props.value
                ? "text-cyan-600 border-cyan-500 dark:text-cyan-300"
                : "text-gray-500 border-transparent hover:text-cyan-500"
            }`}
          >
            {tab.props.label}
          </button>
        ))}
      </div>

      <div>
        {Array.isArray(children)
          ? children.map((child: any) =>
              child.props.value === active ? (
                <TabContent key={child.props.value} value={active} activeValue={active}>
                  {child.props.children}
                </TabContent>
              ) : null
            )
          : null}
      </div>
    </div>
  );
}

export function Tab({ children }: TabProps & { children: ReactNode }) {
  return <>{children}</>;
}

function TabContent({ children }: TabContentProps) {
  return <div className="pt-4">{children}</div>;
}
