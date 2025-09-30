import React from 'react';
import { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb';

interface BreadcrumbPropertiesPanelProps {
  value: BreadcrumbProps;
  onChange: (value: BreadcrumbProps) => void;
}

export const BreadcrumbPropertiesPanel: React.FC<BreadcrumbPropertiesPanelProps> = ({ value, onChange }) => {
  const handleItemChange = (idx: number, key: keyof BreadcrumbItem, val: string) => {
    const newItems = value.items.map((item, i) => i === idx ? { ...item, [key]: val } : item);
    onChange({ ...value, items: newItems });
  };
  const addItem = () => {
    onChange({ ...value, items: [...value.items, { label: '', href: '' }] });
  };
  const removeItem = (idx: number) => {
    onChange({ ...value, items: value.items.filter((_, i) => i !== idx) });
  };
  return (
    <div>
      <label>Separator: <input type="text" value={value.separator || '/'} onChange={e => onChange({ ...value, separator: e.target.value })} /></label>
      <div>
        <strong>Items:</strong>
        {value.items.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <input type="text" placeholder="Label" value={item.label} onChange={e => handleItemChange(idx, 'label', e.target.value)} />
            <input type="text" placeholder="Href" value={item.href || ''} onChange={e => handleItemChange(idx, 'href', e.target.value)} />
            <button type="button" onClick={() => removeItem(idx)}>-</button>
          </div>
        ))}
        <button type="button" onClick={addItem}>Add Item</button>
      </div>
    </div>
  );
};
