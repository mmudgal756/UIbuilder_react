import React from 'react';
import './Input.css';

export interface InputProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  type?: 'text' | 'password' | 'email' | 'number';
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  disabled = false,
  error = false,
  type = 'text',
  icon
}) => {
  return (
    <div style={{ position: 'relative' }}>
      {icon && <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}>{icon}</span>}
      <input
        className={`custom-input${error ? ' error' : ''}`}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
        style={icon ? { paddingLeft: 32 } : {}}
      />
    </div>
  );
};
