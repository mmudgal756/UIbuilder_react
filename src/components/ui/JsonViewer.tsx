import React from 'react';
import { ComponentData } from '../../types';

export interface JsonViewerProps { component: ComponentData; isPreview?: boolean }

export const JsonViewer: React.FC<JsonViewerProps> = ({ component }) => {
  return (
    <pre style={{ overflow: 'auto', ...component.style }}>{JSON.stringify(component.props.data, null, 2)}</pre>
  );
};
