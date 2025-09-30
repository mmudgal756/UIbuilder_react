import React from 'react';
import { ComponentData } from '../../types';

export interface ListProps { component: ComponentData; isPreview?: boolean }

export const List: React.FC<ListProps> = ({ component }) => {
  const items: (string | number)[] = component.props.items ?? [];
  return (
    <ul style={{ paddingLeft: 16, ...component.style }}>
      {items.map((it, i) => <li key={i}>{String(it)}</li>)}
    </ul>
  );
};
