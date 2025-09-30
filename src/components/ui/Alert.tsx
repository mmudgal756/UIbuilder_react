import React from 'react';
import { ComponentData } from '../../types';

export interface AlertProps { component: ComponentData; isPreview?: boolean }

export const Alert: React.FC<AlertProps> = ({ component }) => (
  <div style={{ padding: 12, borderRadius: 6, border: component.style.border || '1px solid #3B82F6', background: component.style.backgroundColor || '#EBF8FF', ...component.style }}>
    <strong>{component.props.title}</strong>
    <div>{component.props.message}</div>
  </div>
);
