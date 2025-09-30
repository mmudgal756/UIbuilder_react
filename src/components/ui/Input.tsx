import React, { useState } from 'react';
import { ComponentData } from '../../types';

export interface InputProps {
  component: ComponentData;
  isPreview?: boolean;
}

export const Input: React.FC<InputProps> = ({ component, isPreview = false }) => {
  const [value, setValue] = useState('');
  
  const baseStyle = {
    width: '100%',
    height: '100%',
    ...component.style,
  };

  return (
    <input
      type={component.props.type || 'text'}
      placeholder={component.props.placeholder}
      style={baseStyle}
      className="outline-none"
      readOnly={!isPreview}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};