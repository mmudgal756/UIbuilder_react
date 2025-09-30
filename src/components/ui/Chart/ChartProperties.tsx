import React from 'react';
import { ChartProps } from './Chart';

interface ChartPropertiesPanelProps {
  value: ChartProps;
  onChange: (value: ChartProps) => void;
}

export const ChartPropertiesPanel: React.FC<ChartPropertiesPanelProps> = ({ value, onChange }) => {
  return (
    <div>
      <label>Type:
        <select value={value.type} onChange={e => onChange({ ...value, type: e.target.value as 'bar' | 'line' | 'pie' })}>
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
        </select>
      </label>
      <label>Width: <input type="number" value={value.width || 400} min={100} max={1200} onChange={e => onChange({ ...value, width: Number(e.target.value) })} /></label>
      <label>Height: <input type="number" value={value.height || 200} min={100} max={800} onChange={e => onChange({ ...value, height: Number(e.target.value) })} /></label>
      {/* For data/options, you may want to use a JSON editor or advanced UI */}
    </div>
  );
};
