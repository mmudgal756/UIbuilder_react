import React from 'react';
import { ComponentData } from '../../types';

export interface RatingProps {
  component: ComponentData;
  isPreview?: boolean;
}

export const Rating: React.FC<RatingProps> = ({ component }) => {
  const value = component.props.value ?? 0;
  const max = component.props.max ?? 5;

  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < value ? 'text-yellow-400' : 'text-gray-300'}>★</span>
      ))}
    </div>
  );
};
