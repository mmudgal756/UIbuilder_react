import React from 'react';
import { ComponentData } from '../../types';

export interface VideoProps { component: ComponentData; isPreview?: boolean }

export const Video: React.FC<VideoProps> = ({ component }) => (
  <video src={component.props.src} controls={!!component.props.controls} autoPlay={!!component.props.autoplay} loop={!!component.props.loop} style={{ width: '100%', height: '100%', ...component.style }} />
);
