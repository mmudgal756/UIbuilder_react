import React from 'react';
import { ComponentData } from '../../types';

export interface SwitchProps { component: ComponentData }

export const Switch: React.FC<SwitchProps> = ({ component }) => {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, ...component.style }}>
      <input type="checkbox" defaultChecked={!!component.props.checked} />
      <span>{component.props.label}</span>
    </label>
  );
};
