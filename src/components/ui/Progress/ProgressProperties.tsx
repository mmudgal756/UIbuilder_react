import React from 'react';
import { ProgressProps } from './Progress';

interface ProgressPropertiesPanelProps {
  value: ProgressProps;
  onChange: (value: ProgressProps) => void;
}

export const ProgressPropertiesPanel: React.FC<ProgressPropertiesPanelProps> = ({ value, onChange }) => {
  return (
    <div>
      <label>Value: <input type="number" value={value.value} onChange={e => onChange({ ...value, value: Number(e.target.value) })} /></label>
      <label>Max: <input type="number" value={value.max || 100} onChange={e => onChange({ ...value, max: Number(e.target.value) })} /></label>
      <label>Color: <input type="color" value={value.color || '#0d9488'} onChange={e => onChange({ ...value, color: e.target.value })} /></label>
      <label>Show Label: <input type="checkbox" checked={value.showLabel} onChange={e => onChange({ ...value, showLabel: e.target.checked })} /></label>
      <label>Height: <input type="number" value={value.height || 16} min={4} max={64} onChange={e => onChange({ ...value, height: Number(e.target.value) })} /></label>
    </div>
  );
};
