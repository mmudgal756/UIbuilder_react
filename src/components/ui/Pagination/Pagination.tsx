import React from 'react';
import './Pagination.css';

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onChange?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, pageSize, total, onChange }) => {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;
  return (
    <div className="custom-pagination">
      <button className="custom-pagination-btn" onClick={() => onChange?.(page - 1)} disabled={page === 1}>Prev</button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`custom-pagination-btn${page === i + 1 ? ' active' : ''}`}
          onClick={() => onChange?.(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button className="custom-pagination-btn" onClick={() => onChange?.(page + 1)} disabled={page === totalPages}>Next</button>
    </div>
  );
};
