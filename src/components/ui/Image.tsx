import React from 'react';
import { ComponentData } from '../../types';

export interface ImageProps {
  component: ComponentData;
  isPreview?: boolean;
}

export const Image: React.FC<ImageProps> = ({ component }) => {
  const baseStyle = {
    width: '100%',
    height: '100%',
    ...component.style,
  };

  return (
    <img
      src={component.props.src}
      alt={component.props.alt || 'Image'}
      style={baseStyle}
      className="object-cover"
    />
  );
};