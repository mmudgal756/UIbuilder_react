import React from 'react';
import { TableProps, TableColumn } from './Table';
import BindingEditor from '../BindingEditor';
import ActionBuilder, { ActionDescriptor } from '../ActionBuilder';

interface TablePropertiesPanelProps {
  value: TableProps & {
    onRowClickAction?: ActionDescriptor | string;
    visible?: string;
    dataBinding?: string;
  };
  onChange: (value: TableProps & {
    onRowClickAction?: ActionDescriptor | string;
    visible?: string;
    dataBinding?: string;
  }) => void;
}

export const TablePropertiesPanel: React.FC<TablePropertiesPanelProps> = ({ value, onChange }) => {
  const handleColumnChange = (idx: number, key: keyof TableColumn, val: string) => {
    const newColumns = value.columns.map((col, i) => i === idx ? { ...col, [key]: val } : col);
    onChange({ ...value, columns: newColumns });
  };
  const addColumn = () => {
    onChange({ ...value, columns: [...value.columns, { key: '', title: '', dataIndex: '' }] });
  };
  const removeColumn = (idx: number) => {
    onChange({ ...value, columns: value.columns.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      {/* Data Section */}
      <div>
        <div className="font-semibold mb-2">Data</div>
        <label className="block mb-1 text-sm">Data Binding
          <BindingEditor value={value.dataBinding || ''} onChange={v => onChange({ ...value, dataBinding: v })} />
          <span className="block text-xs text-gray-400">Bind to query or JS (e.g. {'{{fetchUsers.data}}'})</span>
        </label>
      </div>

      {/* Columns Section */}
      <div>
        <div className="font-semibold mb-2">Columns</div>
        {value.columns.map((col, idx) => (
          <div key={idx} className="flex gap-2 items-center mb-1">
            <input type="text" className="p-1 rounded bg-gray-800 border border-gray-700" placeholder="Key" value={col.key} onChange={e => handleColumnChange(idx, 'key', e.target.value)} />
            <input type="text" className="p-1 rounded bg-gray-800 border border-gray-700" placeholder="Title" value={col.title} onChange={e => handleColumnChange(idx, 'title', e.target.value)} />
            <input type="text" className="p-1 rounded bg-gray-800 border border-gray-700" placeholder="Data Index" value={col.dataIndex} onChange={e => handleColumnChange(idx, 'dataIndex', e.target.value)} />
            <button type="button" className="px-2 py-1 bg-red-700 text-white rounded" onClick={() => removeColumn(idx)}>-</button>
          </div>
        ))}
        <button type="button" className="mt-1 px-2 py-1 bg-blue-700 text-white rounded" onClick={addColumn}>Add Column</button>
      </div>

      {/* Options Section */}
      <div>
        <div className="font-semibold mb-2">Options</div>
        <label className="block mb-1 text-sm">Striped
          <input type="checkbox" checked={!!value.striped} onChange={e => onChange({ ...value, striped: e.target.checked })} />
        </label>
        <label className="block mb-1 text-sm">Hover
          <input type="checkbox" checked={!!value.hover} onChange={e => onChange({ ...value, hover: e.target.checked })} />
        </label>
        <label className="block mb-1 text-sm">Pagination
          <input type="checkbox" checked={!!value.pagination} onChange={e => onChange({ ...value, pagination: e.target.checked })} />
        </label>
        <label className="block mb-1 text-sm">Page Size
          <input type="number" className="w-20 p-1 rounded bg-gray-800 border border-gray-700" value={value.pageSize || 10} min={1} onChange={e => onChange({ ...value, pageSize: Number(e.target.value) })} />
        </label>
      </div>

      {/* Events Section */}
      <div>
        <div className="font-semibold mb-2">Events</div>
        <label className="block mb-1 text-sm">onRowClick Action
          <ActionBuilder value={value.onRowClickAction} onChange={v => onChange({ ...value, onRowClickAction: v })} />
          <span className="block text-xs text-gray-400">Run query, JS, or navigate on row click</span>
        </label>
      </div>

      {/* Advanced Section */}
      <div>
        <div className="font-semibold mb-2">Advanced</div>
        <label className="block mb-1 text-sm">Visible
          <BindingEditor value={value.visible || ''} onChange={v => onChange({ ...value, visible: v })} />
          <span className="block text-xs text-gray-400">Show/hide based on JS expression (e.g. {'{{user.canSeeTable}}'})</span>
        </label>
      </div>
    </div>
  );
};
