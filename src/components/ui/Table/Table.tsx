import React from 'react';
import './Table.css';

export interface TableColumn {
  key: string;
  title: string;
  dataIndex: string;
  render?: (value: any, row: any, index: number) => React.ReactNode;
}

export interface TableProps {
  columns: TableColumn[];
  data: any[];
  striped?: boolean;
  hover?: boolean;
  pagination?: boolean;
  pageSize?: number;
  onRowClick?: (row: any, index: number) => void;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  striped = false,
  hover = false,
  pagination = false,
  pageSize = 10,
  onRowClick
}) => {
  const [page, setPage] = React.useState(1);
  const pagedData = pagination ? data.slice((page-1)*pageSize, page*pageSize) : data;
  const totalPages = Math.ceil(data.length / pageSize);
  return (
    <div>
      <table className={`custom-table${striped ? ' striped' : ''}${hover ? ' hover' : ''}`}>
        <thead>
          <tr>
            {columns.map(col => <th key={col.key}>{col.title}</th>)}
          </tr>
        </thead>
        <tbody>
          {pagedData.map((row, i) => (
            <tr key={i} onClick={() => onRowClick?.(row, i)}>
              {columns.map(col => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.dataIndex], row, i) : row[col.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && totalPages > 1 && (
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}>Prev</button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
};
