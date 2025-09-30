import React from 'react';
import './Tabs.css';

export interface Tab {
  key: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  activeKey?: string;
  onTabChange?: (key: string) => void;
  orientation?: 'horizontal' | 'vertical';
  tabPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeKey,
  onTabChange,
  orientation = 'horizontal',
  tabPosition = 'top'
}) => {
  const [current, setCurrent] = React.useState(activeKey || tabs[0]?.key);
  React.useEffect(() => {
    if (activeKey) setCurrent(activeKey);
  }, [activeKey]);
  const handleTabClick = (key: string) => {
    setCurrent(key);
    onTabChange?.(key);
  };
  return (
    <div className="custom-tabs" style={{ flexDirection: orientation === 'vertical' ? 'row' : 'column' }}>
      {(tabPosition === 'top' || tabPosition === 'left') && (
        <div className="custom-tabs-header">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`custom-tab${current === tab.key ? ' active' : ''}`}
              onClick={() => handleTabClick(tab.key)}
              disabled={tab.disabled}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
      <div className="custom-tabs-content">
        {tabs.find(tab => tab.key === current)?.content}
      </div>
      {(tabPosition === 'bottom' || tabPosition === 'right') && (
        <div className="custom-tabs-header">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`custom-tab${current === tab.key ? ' active' : ''}`}
              onClick={() => handleTabClick(tab.key)}
              disabled={tab.disabled}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
