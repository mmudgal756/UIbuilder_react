import React from 'react';
import { TabsProps, Tab } from './Tabs';

interface TabsPropertiesPanelProps {
  value: TabsProps;
  onChange: (value: TabsProps) => void;
}

export const TabsPropertiesPanel: React.FC<TabsPropertiesPanelProps> = ({ value, onChange }) => {
  const handleTabChange = (idx: number, key: keyof Tab, val: string | boolean | React.ReactNode) => {
    const newTabs = value.tabs.map((tab, i) => i === idx ? { ...tab, [key]: val } : tab);
    onChange({ ...value, tabs: newTabs });
  };
  const addTab = () => {
    onChange({ ...value, tabs: [...value.tabs, { key: '', label: '', content: '' }] });
  };
  const removeTab = (idx: number) => {
    onChange({ ...value, tabs: value.tabs.filter((_, i) => i !== idx) });
  };
  return (
    <div>
      <label>Orientation:
        <select value={value.orientation || 'horizontal'} onChange={e => onChange({ ...value, orientation: e.target.value as 'horizontal' | 'vertical' })}>
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
        </select>
      </label>
      <label>Tab Position:
        <select value={value.tabPosition || 'top'} onChange={e => onChange({ ...value, tabPosition: e.target.value as 'top' | 'bottom' | 'left' | 'right' })}>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </label>
      <div>
        <strong>Tabs:</strong>
        {value.tabs.map((tab, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <input type="text" placeholder="Key" value={tab.key} onChange={e => handleTabChange(idx, 'key', e.target.value)} />
            <input type="text" placeholder="Label" value={tab.label} onChange={e => handleTabChange(idx, 'label', e.target.value)} />
            <label>Disabled: <input type="checkbox" checked={!!tab.disabled} onChange={e => handleTabChange(idx, 'disabled', e.target.checked)} /></label>
            <button type="button" onClick={() => removeTab(idx)}>-</button>
          </div>
        ))}
        <button type="button" onClick={addTab}>Add Tab</button>
      </div>
    </div>
  );
};
