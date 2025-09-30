import React from 'react';
import './Badge.css';

export interface BadgeProps {
  text: string;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
  color?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  type = 'default',
  color
}) => {
  const classNames = ['custom-badge', type !== 'default' ? type : ''].join(' ');
  return (
    <span className={classNames} style={color ? { background: color } : {}}>{text}</span>
  );
};
