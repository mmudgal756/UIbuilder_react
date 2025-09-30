import React from 'react';
import { ComponentData } from '../../types';

export interface TextProps {
  component: ComponentData;
  isPreview?: boolean;
}

export const Text: React.FC<TextProps> = ({ component }) => {
  const baseStyle = {
    width: '100%',
    height: '100%',
    fontSize: component.props.fontSize || '16px',
    fontWeight: component.props.fontWeight || 'normal',
    ...component.style,
  };

  return (
    <div 
      style={baseStyle}
      className="flex items-center"
    >
      {component.props.content || 'Text'}
    </div>
  );
};