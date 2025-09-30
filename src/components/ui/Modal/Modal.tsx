import React from 'react';
import './Modal.css';

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number | string;
  closeOnBackdrop?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  width = 400,
  closeOnBackdrop = true
}) => {
  if (!open) return null;
  return (
    <div className="custom-modal">
      <div className="custom-modal-backdrop" onClick={closeOnBackdrop ? onClose : undefined} />
      <div className="custom-modal-content" style={{ width }}>
        {title && <h2 style={{ marginTop: 0 }}>{title}</h2>}
        {children}
        {footer && <div style={{ marginTop: 24 }}>{footer}</div>}
      </div>
    </div>
  );
};
