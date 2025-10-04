import React from 'react';
import { TimelineProps, TimelineItem } from './Timeline';

interface TimelinePropertiesPanelProps {
  value: TimelineProps;
  onChange: (value: TimelineProps) => void;
}

export const TimelinePropertiesPanel: React.FC<TimelinePropertiesPanelProps> = ({ value, onChange }) => {
  const handleItemChange = (idx: number, key: keyof TimelineItem, val: string) => {
    const newItems = value.items.map((item, i) => i === idx ? { ...item, [key]: val } : item);
    onChange({ ...value, items: newItems });
  };
  const addItem = () => {
    onChange({ ...value, items: [...value.items, { key: '', label: '', content: '' }] });
  };
  const removeItem = (idx: number) => {
    onChange({ ...value, items: value.items.filter((_, i) => i !== idx) });
  };
  return (
    <div>
      <div>
        <strong>Items:</strong>
        {value.items.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <input type="text" placeholder="Key" value={item.key} onChange={e => handleItemChange(idx, 'key', e.target.value)} />
            <input type="text" placeholder="Label" value={item.label} onChange={e => handleItemChange(idx, 'label', e.target.value)} />
            <input type="text" placeholder="Content" value={item.content as string} onChange={e => handleItemChange(idx, 'content', e.target.value)} />
            <input type="color" value={item.color || '#0d9488'} onChange={e => handleItemChange(idx, 'color', e.target.value)} />
            <button type="button" onClick={() => removeItem(idx)}>-</button>
          </div>
        ))}
        <button type="button" onClick={addItem}>Add Item</button>
      </div>
    </div>
  );
};
