import React from 'react';
import { ComponentData } from '../../types';

export interface BreadcrumbProps { component: ComponentData; isPreview?: boolean }

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ component }) => (
  <nav style={{ display: 'flex', gap: 8, alignItems: 'center', ...component.style }}>
    {(component.props.items ?? []).map((it: { label?: string; href?: string }, i: number) => (
      <a key={i} href={it.href || '#'}>{it.label}</a>
    ))}
  </nav>
);
