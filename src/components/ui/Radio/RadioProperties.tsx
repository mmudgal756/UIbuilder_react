import React from 'react';
import { RadioProps } from './Radio';

interface RadioPropertiesPanelProps {
  value: RadioProps;
  onChange: (value: RadioProps) => void;
}

export const RadioPropertiesPanel: React.FC<RadioPropertiesPanelProps> = ({ value, onChange }) => {
  return (
    <div>
      <label>Label: <input type="text" value={value.label || ''} onChange={e => onChange({ ...value, label: e.target.value })} /></label>
      <label>Checked: <input type="checkbox" checked={value.checked} onChange={e => onChange({ ...value, checked: e.target.checked })} /></label>
      <label>Disabled: <input type="checkbox" checked={value.disabled} onChange={e => onChange({ ...value, disabled: e.target.checked })} /></label>
      <label>Value: <input type="text" value={value.value || ''} onChange={e => onChange({ ...value, value: e.target.value })} /></label>
      <label>Name: <input type="text" value={value.name || ''} onChange={e => onChange({ ...value, name: e.target.value })} /></label>
    </div>
  );
};
