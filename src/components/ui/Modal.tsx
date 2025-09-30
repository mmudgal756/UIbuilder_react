import React from 'react';
import { ComponentData } from '../../types';

export interface ModalProps { component: ComponentData; isPreview?: boolean }

export const Modal: React.FC<ModalProps> = ({ component }) => (
  component.props.isOpen ? (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: component.style.width || 400, padding: 16, background: '#fff', borderRadius: 8 }}>{component.props.content}</div>
    </div>
  ) : null
);
