import React from 'react';
import { ComponentData } from '../../types';

export interface ChartProps {
  component: ComponentData;
  isPreview?: boolean;
}

export const Chart: React.FC<ChartProps> = ({ component }) => {
  // Minimal placeholder renderer for chart types
  return (
    <div style={{ width: '100%', height: '100%', ...component.style }}>
      <div className="text-sm text-gray-500">Chart ({component.props.type || 'unknown'})</div>
    </div>
  );
};
