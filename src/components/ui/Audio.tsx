import React from 'react';
import { ComponentData } from '../../types';

export interface AudioProps { component: ComponentData; isPreview?: boolean }

export const Audio: React.FC<AudioProps> = ({ component }) => (
  <audio src={component.props.src} controls={!!component.props.controls} style={{ width: '100%', ...component.style }} />
);
