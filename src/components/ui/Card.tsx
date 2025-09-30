import React from 'react';
import { ComponentData } from '../../types';

export interface CardProps {
  component: ComponentData;
  children?: React.ReactNode;
  isPreview?: boolean;
}

export const Card: React.FC<CardProps> = ({ component, children }) => {
  const baseStyle = {
    padding: '12px',
    background: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    borderRadius: '6px',
    ...component.style,
  } as React.CSSProperties;

  return (
    <div style={baseStyle} className="card">
      {component.props.title && <div className="font-semibold mb-2">{component.props.title}</div>}
      <div>{component.props.content}</div>
      {children}
    </div>
  );
};
