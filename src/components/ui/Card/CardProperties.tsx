import React from 'react';
import { CardProps } from './Card';

interface CardPropertiesPanelProps {
  value: CardProps;
  onChange: (value: CardProps) => void;
}

export const CardPropertiesPanel: React.FC<CardPropertiesPanelProps> = ({ value, onChange }) => {
  return (
    <div>
      <label>Title: <input type="text" value={value.title || ''} onChange={e => onChange({ ...value, title: e.target.value })} /></label>
      <label>Subtitle: <input type="text" value={value.subtitle || ''} onChange={e => onChange({ ...value, subtitle: e.target.value })} /></label>
      <label>Cover Image: <input type="text" value={value.coverImage || ''} onChange={e => onChange({ ...value, coverImage: e.target.value })} placeholder="Image URL" /></label>
      <label>Hoverable: <input type="checkbox" checked={value.hoverable} onChange={e => onChange({ ...value, hoverable: e.target.checked })} /></label>
      <label>Outlined: <input type="checkbox" checked={value.outlined} onChange={e => onChange({ ...value, outlined: e.target.checked })} /></label>
    </div>
  );
};
