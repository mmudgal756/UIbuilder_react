import React from 'react';
import './DatePicker.css';

export interface DatePickerProps {
  value: string;
  onChange?: (value: string) => void;
  min?: string;
  max?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  min,
  max,
  disabled = false,
  placeholder = ''
}) => {
  return (
    <input
      type="date"
      className="custom-datepicker"
      value={value}
      onChange={e => onChange?.(e.target.value)}
      min={min}
      max={max}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};
