import React from 'react';
import { ComponentData } from '../../types';

export interface CodeBlockProps { component: ComponentData; isPreview?: boolean }

export const CodeBlock: React.FC<CodeBlockProps> = ({ component }) => (
  <pre style={{ fontFamily: 'monospace', padding: 12, background: component.style.backgroundColor || '#1F2937', color: component.style.color || '#F9FAFB', ...component.style }}>{component.props.code}</pre>
);
