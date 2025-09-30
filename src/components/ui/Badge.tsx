import React from 'react';
import { ComponentData } from '../../types';
import { StyleProps } from '../../types/ui/shared';

export interface BadgeProps {
  component: ComponentData;
  isPreview?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ component }) => {
  const s = (component.style || {}) as StyleProps;
  const style: React.CSSProperties = {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 12,
    background: s.background?.color ?? '#3B82F6',
    color: s.typography?.color ?? '#fff',
    ...s,
  } as React.CSSProperties;

  return <span style={style}>{component.props?.text ?? ''}</span>;
};
