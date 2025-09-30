import React from 'react';
import { CheckboxProps } from './Checkbox';

interface CheckboxPropertiesPanelProps {
  value: CheckboxProps;
  onChange: (value: CheckboxProps) => void;
}

export const CheckboxPropertiesPanel: React.FC<CheckboxPropertiesPanelProps> = ({ value, onChange }) => {
  return (
    <div>
      <label>Label: <input type="text" value={value.label || ''} onChange={e => onChange({ ...value, label: e.target.value })} /></label>
      <label>Checked: <input type="checkbox" checked={value.checked} onChange={e => onChange({ ...value, checked: e.target.checked })} /></label>
      <label>Indeterminate: <input type="checkbox" checked={value.indeterminate} onChange={e => onChange({ ...value, indeterminate: e.target.checked })} /></label>
      <label>Disabled: <input type="checkbox" checked={value.disabled} onChange={e => onChange({ ...value, disabled: e.target.checked })} /></label>
    </div>
  );
};
