import React from 'react';
import { ModalProps } from './Modal';

interface ModalPropertiesPanelProps {
  value: ModalProps;
  onChange: (value: ModalProps) => void;
}

export const ModalPropertiesPanel: React.FC<ModalPropertiesPanelProps> = ({ value, onChange }) => {
  return (
    <div>
      <label>Title: <input type="text" value={value.title || ''} onChange={e => onChange({ ...value, title: e.target.value })} /></label>
      <label>Open: <input type="checkbox" checked={value.open} onChange={e => onChange({ ...value, open: e.target.checked })} /></label>
      <label>Width: <input type="text" value={value.width?.toString() || '400'} onChange={e => onChange({ ...value, width: e.target.value })} /></label>
      <label>Close on Backdrop: <input type="checkbox" checked={value.closeOnBackdrop} onChange={e => onChange({ ...value, closeOnBackdrop: e.target.checked })} /></label>
    </div>
  );
};
