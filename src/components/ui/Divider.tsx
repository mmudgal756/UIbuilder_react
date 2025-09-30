import React from 'react';
import { ComponentData } from '../../types';

export interface DividerProps { component: ComponentData }

export const Divider: React.FC<DividerProps> = ({ component }) => {
  const style: React.CSSProperties = { height: component.props.orientation === 'vertical' ? '100%' : (component.style.height || '1px'), background: component.style.backgroundColor || '#E5E7EB', ...component.style };
  return <div style={style} />;
};
