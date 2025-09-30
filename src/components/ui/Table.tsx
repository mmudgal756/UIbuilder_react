import React from 'react';
import { ComponentData } from '../../types';

export interface TableProps { component: ComponentData; isPreview?: boolean }

export const Table: React.FC<TableProps> = ({ component }) => {
  const columns: string[] = component.props.columns ?? [];
  const data: Record<string, unknown>[] = component.props.data ?? [];
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', ...component.style }}>
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i} style={{ textAlign: 'left', borderBottom: '1px solid #E5E7EB', padding: 8 }}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, r) => (
          <tr key={r}>
            {columns.map((col, c) => (
              <td key={c} style={{ padding: 8, borderBottom: '1px solid #F3F4F6' }}>{String(row[col] ?? '')}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
