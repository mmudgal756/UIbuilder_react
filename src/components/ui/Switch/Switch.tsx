import React from 'react';
import './Switch.css';

export interface SwitchProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false
}) => {
  return (
    <label className="custom-switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange?.(e.target.checked)}
        disabled={disabled}
      />
      <span className="switch-slider" />
      {label}
    </label>
  );
};
