import React from 'react';
import { ComponentData } from '../../types';

export interface ContainerProps {
  component: ComponentData;
  children?: React.ReactNode;
  isPreview?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ component, children }) => {
  const baseStyle = {
    width: '100%',
    height: '100%',
    padding: component.props.padding,
    backgroundColor: component.props.backgroundColor,
    border: component.props.border,
    borderRadius: component.props.borderRadius,
    ...component.style,
  } as React.CSSProperties;

  return (
    <div style={baseStyle} className="box-border">
      {children}
    </div>
  );
};
