import React from 'react';
import { SwitchProps } from './Switch';

interface SwitchPropertiesPanelProps {
  value: SwitchProps;
  onChange: (value: SwitchProps) => void;
}

export const SwitchPropertiesPanel: React.FC<SwitchPropertiesPanelProps> = ({ value, onChange }) => {
  return (
    <div>
      <label>Label: <input type="text" value={value.label || ''} onChange={e => onChange({ ...value, label: e.target.value })} /></label>
      <label>Checked: <input type="checkbox" checked={value.checked} onChange={e => onChange({ ...value, checked: e.target.checked })} /></label>
      <label>Disabled: <input type="checkbox" checked={value.disabled} onChange={e => onChange({ ...value, disabled: e.target.checked })} /></label>
    </div>
  );
};
