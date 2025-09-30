import React from 'react';
import { AvatarProps } from './Avatar';

interface AvatarPropertiesPanelProps {
  value: AvatarProps;
  onChange: (value: AvatarProps) => void;
}

export const AvatarPropertiesPanel: React.FC<AvatarPropertiesPanelProps> = ({ value, onChange }) => {
  return (
    <div>
      <label>Image URL: <input type="text" value={value.src || ''} onChange={e => onChange({ ...value, src: e.target.value })} /></label>
      <label>Alt Text: <input type="text" value={value.alt || ''} onChange={e => onChange({ ...value, alt: e.target.value })} /></label>
      <label>Text: <input type="text" value={value.text || ''} onChange={e => onChange({ ...value, text: e.target.value })} /></label>
      <label>Size: <input type="number" value={value.size || 40} min={16} max={128} onChange={e => onChange({ ...value, size: Number(e.target.value) })} /></label>
      <label>Shape:
        <select value={value.shape || 'circle'} onChange={e => onChange({ ...value, shape: e.target.value as 'circle' | 'square' })}>
          <option value="circle">Circle</option>
          <option value="square">Square</option>
        </select>
      </label>
    </div>
  );
};
