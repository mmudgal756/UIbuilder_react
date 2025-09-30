import React from 'react';
import './Checkbox.css';

export interface CheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  indeterminate = false
}) => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  return (
    <label className="custom-checkbox">
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={e => onChange?.(e.target.checked)}
        disabled={disabled}
      />
      <span className="checkmark" />
      {label}
    </label>
  );
};
