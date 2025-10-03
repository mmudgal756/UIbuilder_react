import React from 'react';

import { CardProps } from '../../../types/ui/Card';

export interface UICardProps extends CardProps {
  style?: React.CSSProperties;
  isPreview?: boolean;
  children?: React.ReactNode;
}

export const Card: React.FC<UICardProps> = ({ title, subtitle, style, children }) => {
  const baseStyle = {
    padding: '12px',
    backgroundColor: style?.backgroundColor ?? '#1D4ED8',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    borderRadius: '6px',
    ...style,
  } as React.CSSProperties;

  return (
    <div style={baseStyle} className="card">
      {title && <div className="font-semibold mb-2">{title}</div>}
      <div>{subtitle}</div>
      {children}
    </div>
  );
};
