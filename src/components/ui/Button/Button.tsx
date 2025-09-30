import React from 'react';
import './Button.css';

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
}) => {
  return (
    <button
      className={`custom-btn ${variant} ${size}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <span className="spinner" /> : icon}
      {label}
    </button>
  );
};
