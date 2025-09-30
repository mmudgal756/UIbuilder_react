import React from 'react';
import { BadgeProps } from './Badge';

interface BadgePropertiesPanelProps {
  value: BadgeProps;
  onChange: (value: BadgeProps) => void;
}

export const BadgePropertiesPanel: React.FC<BadgePropertiesPanelProps> = ({ value, onChange }) => {
  return (
    <div>
      <label>Text: <input type="text" value={value.text} onChange={e => onChange({ ...value, text: e.target.value })} /></label>
      <label>Type:
        <select value={value.type || 'default'} onChange={e => onChange({ ...value, type: e.target.value as 'default' | 'success' | 'error' | 'warning' | 'info' })}>
          <option value="default">Default</option>
          <option value="success">Success</option>
          <option value="error">Error</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>
      </label>
      <label>Custom Color: <input type="color" value={value.color || ''} onChange={e => onChange({ ...value, color: e.target.value })} /></label>
    </div>
  );
};
