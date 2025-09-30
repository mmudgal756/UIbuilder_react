import React from 'react';
import { SelectProps, SelectOption } from './Select';

interface SelectPropertiesPanelProps {
  value: SelectProps;
  onChange: (value: SelectProps) => void;
}

export const SelectPropertiesPanel: React.FC<SelectPropertiesPanelProps> = ({ value, onChange }) => {
  const handleOptionChange = (idx: number, key: keyof SelectOption, val: string | boolean) => {
    const newOptions = value.options.map((opt, i) => i === idx ? { ...opt, [key]: val } : opt);
    onChange({ ...value, options: newOptions });
  };
  const addOption = () => {
    onChange({ ...value, options: [...value.options, { label: '', value: '' }] });
  };
  const removeOption = (idx: number) => {
    onChange({ ...value, options: value.options.filter((_, i) => i !== idx) });
  };
  return (
    <div>
      <label>Placeholder: <input type="text" value={value.placeholder || ''} onChange={e => onChange({ ...value, placeholder: e.target.value })} /></label>
      <label>Disabled: <input type="checkbox" checked={value.disabled} onChange={e => onChange({ ...value, disabled: e.target.checked })} /></label>
      <label>Error: <input type="checkbox" checked={value.error} onChange={e => onChange({ ...value, error: e.target.checked })} /></label>
      <label>Multiple: <input type="checkbox" checked={value.multiple} onChange={e => onChange({ ...value, multiple: e.target.checked })} /></label>
      <div>
        <strong>Options:</strong>
        {value.options.map((opt, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <input type="text" placeholder="Label" value={opt.label} onChange={e => handleOptionChange(idx, 'label', e.target.value)} />
            <input type="text" placeholder="Value" value={opt.value} onChange={e => handleOptionChange(idx, 'value', e.target.value)} />
            <label>Disabled: <input type="checkbox" checked={!!opt.disabled} onChange={e => handleOptionChange(idx, 'disabled', e.target.checked)} /></label>
            <button type="button" onClick={() => removeOption(idx)}>-</button>
          </div>
        ))}
        <button type="button" onClick={addOption}>Add Option</button>
      </div>
    </div>
  );
};
