import React from 'react';
import { ComponentData } from '../../types';

export interface AvatarProps { component: ComponentData; isPreview?: boolean }

export const Avatar: React.FC<AvatarProps> = ({ component }) => (
  <img src={component.props.src} alt={component.props.name || 'avatar'} style={{ width: component.props.size === 'sm' ? 32 : component.props.size === 'lg' ? 64 : 48, height: component.props.size === 'sm' ? 32 : component.props.size === 'lg' ? 64 : 48, borderRadius: component.props.shape === 'square' ? 6 : '50%', ...component.style }} />
);
