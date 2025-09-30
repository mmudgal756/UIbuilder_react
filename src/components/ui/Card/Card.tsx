import React from 'react';
import './Card.css';

export interface CardProps {
  children?: React.ReactNode;
  hoverable?: boolean;
  outlined?: boolean;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  coverImage?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  outlined = false,
  title,
  subtitle,
  actions,
  coverImage
}) => {
  const classNames = [
    'custom-card',
    hoverable ? 'hoverable' : '',
    outlined ? 'outlined' : ''
  ].join(' ');
  return (
    <div className={classNames}>
      {coverImage && <img src={coverImage} alt="cover" style={{ width: '100%', borderRadius: '0.75rem 0.75rem 0 0' }} />}
      {title && <h3 style={{ margin: '0.5rem 0 0.25rem 0' }}>{title}</h3>}
      {subtitle && <p style={{ margin: 0, color: '#6b7280' }}>{subtitle}</p>}
      {children}
      {actions && <div style={{ marginTop: '1rem' }}>{actions}</div>}
    </div>
  );
};
