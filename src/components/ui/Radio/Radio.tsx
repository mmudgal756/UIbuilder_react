import React from 'react';
import './Radio.css';

export interface RadioProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  value?: string;
  name?: string;
}

export const Radio: React.FC<RadioProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  value,
  name
}) => {
  return (
    <label className="custom-radio">
      <input
        type="radio"
        checked={checked}
        onChange={e => onChange?.(e.target.checked)}
        disabled={disabled}
        value={value}
        name={name}
      />
      <span className="radiomark" />
      {label}
    </label>
  );
};
