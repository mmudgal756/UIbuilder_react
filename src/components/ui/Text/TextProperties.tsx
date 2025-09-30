import React from 'react';
import { TextProps } from './Text';

interface TextPropertiesPanelProps {
  value: TextProps;
  onChange: (value: TextProps) => void;
}

export const TextPropertiesPanel: React.FC<TextPropertiesPanelProps> = ({ value, onChange }) => {
  return (
    <div>
      <label>Text: <input type="text" value={value.text} onChange={e => onChange({ ...value, text: e.target.value })} /></label>
      <label>Bold: <input type="checkbox" checked={value.bold} onChange={e => onChange({ ...value, bold: e.target.checked })} /></label>
      <label>Italic: <input type="checkbox" checked={value.italic} onChange={e => onChange({ ...value, italic: e.target.checked })} /></label>
      <label>Underline: <input type="checkbox" checked={value.underline} onChange={e => onChange({ ...value, underline: e.target.checked })} /></label>
      <label>Color: <input type="color" value={value.color || '#22223b'} onChange={e => onChange({ ...value, color: e.target.value })} /></label>
      <label>Size:
        <select value={value.size} onChange={e => onChange({ ...value, size: e.target.value as 'sm' | 'md' | 'lg' })}>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
        </select>
      </label>
    </div>
  );
};
