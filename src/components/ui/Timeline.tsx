import React from 'react';
import { ComponentData } from '../../types';

export interface TimelineProps { component: ComponentData; isPreview?: boolean }

export const Timeline: React.FC<TimelineProps> = ({ component }) => (
  <div style={{ ...component.style }}>
    {(component.props.items ?? []).map((it: { title?: string; description?: string; date?: string }, i: number) => (
      <div key={i} style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 'bold' }}>{it.title}</div>
        <div style={{ fontSize: 12 }}>{it.date}</div>
        <div>{it.description}</div>
      </div>
    ))}
  </div>
);
