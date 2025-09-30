import React from 'react';
import { ComponentData } from '../../types';

export interface RadioProps { component: ComponentData; isPreview?: boolean }

export const Radio: React.FC<RadioProps> = ({ component }) => {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, ...component.style }}>
      <input type="radio" name={component.props.name} value={component.props.value} defaultChecked={component.props.defaultChecked} />
      <span>{component.props.label}</span>
    </label>
  );
};
