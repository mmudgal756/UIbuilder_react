import React from 'react';
import { PaginationProps } from './Pagination';

interface PaginationPropertiesPanelProps {
  value: PaginationProps;
  onChange: (value: PaginationProps) => void;
}

export const PaginationPropertiesPanel: React.FC<PaginationPropertiesPanelProps> = ({ value, onChange }) => {
  return (
    <div>
      <label>Page: <input type="number" value={value.page} min={1} onChange={e => onChange({ ...value, page: Number(e.target.value) })} /></label>
      <label>Page Size: <input type="number" value={value.pageSize} min={1} onChange={e => onChange({ ...value, pageSize: Number(e.target.value) })} /></label>
      <label>Total: <input type="number" value={value.total} min={0} onChange={e => onChange({ ...value, total: Number(e.target.value) })} /></label>
    </div>
  );
};
