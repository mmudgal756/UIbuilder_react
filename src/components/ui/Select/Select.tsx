import React from 'react';
import './Select.css';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  value: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  multiple?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = '',
  disabled = false,
  error = false,
  multiple = false
}) => {
  return (
    <select
      className={`custom-select${error ? ' error' : ''}`}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      disabled={disabled}
      multiple={multiple}
    >
      {placeholder && !multiple && <option value="" disabled>{placeholder}</option>}
      {options.map(opt => (
        <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>
      ))}
    </select>
  );
};
