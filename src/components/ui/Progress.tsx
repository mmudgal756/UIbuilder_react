import React from 'react';
import { ComponentData } from '../../types';

export interface ProgressProps { component: ComponentData; isPreview?: boolean }

export const Progress: React.FC<ProgressProps> = ({ component }) => {
  const value = component.props.value ?? 0;
  const max = component.props.max ?? 100;
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div style={{ background: component.style.backgroundColor || '#E5E7EB', borderRadius: 4, width: '100%', height: component.style.height || 8 }}>
      <div style={{ width: `${pct}%`, background: '#3B82F6', height: '100%', borderRadius: 4 }} />
    </div>
  );
};
