import React from 'react';
import { ComponentData } from '../../types';
import ReactMarkdown from 'react-markdown';

export interface MarkdownProps { component: ComponentData; isPreview?: boolean }

export const Markdown: React.FC<MarkdownProps> = ({ component }) => (
  <div style={{ ...component.style }}>
    <ReactMarkdown>{component.props.content || ''}</ReactMarkdown>
  </div>
);
