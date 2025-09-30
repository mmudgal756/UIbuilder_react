import React from 'react';
import { ComponentData } from '../../types';

export interface TabsProps { component: ComponentData; isPreview?: boolean }

export const Tabs: React.FC<TabsProps> = ({ component }) => {
  type Tab = { label?: string; content?: React.ReactNode };
  const tabs: Tab[] = component.props.tabs ?? [];
  const active = component.props.activeTab ?? 0;
  return (
    <div style={{ ...component.style }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {tabs.map((t, i) => <button key={i}>{t.label}</button>)}
      </div>
      <div style={{ marginTop: 12 }}>{tabs[active]?.content}</div>
    </div>
  );
};
