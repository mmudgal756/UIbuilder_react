import React from 'react';
import { SliderProps } from './Slider';

interface SliderPropertiesPanelProps {
  value: SliderProps;
  onChange: (value: SliderProps) => void;
}

export const SliderPropertiesPanel: React.FC<SliderPropertiesPanelProps> = ({ value, onChange }) => {
  return (
    <div>
      <label>Value: <input type="number" value={value.value} onChange={e => onChange({ ...value, value: Number(e.target.value) })} /></label>
      <label>Min: <input type="number" value={value.min || 0} onChange={e => onChange({ ...value, min: Number(e.target.value) })} /></label>
      <label>Max: <input type="number" value={value.max || 100} onChange={e => onChange({ ...value, max: Number(e.target.value) })} /></label>
      <label>Step: <input type="number" value={value.step || 1} onChange={e => onChange({ ...value, step: Number(e.target.value) })} /></label>
      <label>Show Value: <input type="checkbox" checked={value.showValue} onChange={e => onChange({ ...value, showValue: e.target.checked })} /></label>
      <label>Disabled: <input type="checkbox" checked={value.disabled} onChange={e => onChange({ ...value, disabled: e.target.checked })} /></label>
    </div>
  );
};
