// Tabs.tsx
import React, { useState } from "react";
import { Typography } from "../Typography";
const { Text } = Typography;
interface Tab {
  label: string;
  key: string;
  onClick?: () => void;
}

interface TabsProps {
  tabs: Tab[];
}

export default function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <div>
      <div className="tab-list">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab ${tab.key === activeTab ? "tab-active" : ""}`}
            onClick={() => {
              setActiveTab(tab.key);
              if (tab.onClick) tab.onClick();
            }}
          >
            <Text>{tab.label}</Text>
          </button>
        ))}
      </div>
    </div>
  );
}
