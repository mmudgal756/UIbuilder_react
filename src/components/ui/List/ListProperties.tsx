import React from 'react';
import { ListProps, ListItem } from './List';

interface ListPropertiesPanelProps {
  value: ListProps;
  onChange: (value: ListProps) => void;
}

export const ListPropertiesPanel: React.FC<ListPropertiesPanelProps> = ({ value, onChange }) => {
  const handleItemChange = (idx: number, key: keyof ListItem, val: string) => {
    const newItems = value.items.map((item, i) => i === idx ? { ...item, [key]: val } : item);
    onChange({ ...value, items: newItems });
  };
  const addItem = () => {
    onChange({ ...value, items: [...value.items, { key: '', content: '' }] });
  };
  const removeItem = (idx: number) => {
    onChange({ ...value, items: value.items.filter((_, i) => i !== idx) });
  };
  return (
    <div>
      <label>Bordered: <input type="checkbox" checked={value.bordered} onChange={e => onChange({ ...value, bordered: e.target.checked })} /></label>
      <div>
        <strong>Items:</strong>
        {value.items.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <input type="text" placeholder="Key" value={item.key} onChange={e => handleItemChange(idx, 'key', e.target.value)} />
            <input type="text" placeholder="Content" value={item.content as string} onChange={e => handleItemChange(idx, 'content', e.target.value)} />
            <button type="button" onClick={() => removeItem(idx)}>-</button>
          </div>
        ))}
        <button type="button" onClick={addItem}>Add Item</button>
      </div>
    </div>
  );
};
