import React from 'react';
import { ComponentData } from '../../types';

export interface SliderProps { component: ComponentData; isPreview?: boolean }

export const Slider: React.FC<SliderProps> = ({ component }) => {
  return (
    <input type="range" min={component.props.min} max={component.props.max} defaultValue={component.props.value} step={component.props.step} style={{ width: '100%', ...component.style }} />
  );
};
