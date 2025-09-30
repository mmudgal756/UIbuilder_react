import React from 'react';
import { ComponentData } from '../../types';

export interface IframeProps { component: ComponentData; isPreview?: boolean }

export const Iframe: React.FC<IframeProps> = ({ component }) => (
  <iframe src={component.props.src} title={component.props.title || 'iframe'} style={{ width: '100%', height: '100%', border: 'none', ...component.style }} />
);
