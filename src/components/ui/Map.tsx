import React from 'react';
import { ComponentData } from '../../types';

export interface MapProps { component: ComponentData; isPreview?: boolean }

export const Map: React.FC<MapProps> = ({ component }) => (
  <div style={{ ...component.style }}>Map (center: {JSON.stringify(component.props.center)})</div>
);
