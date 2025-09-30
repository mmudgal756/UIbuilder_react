import React from 'react';
import { ComponentData } from '../../types';

export interface PaginationProps { component: ComponentData; isPreview?: boolean }

export const Pagination: React.FC<PaginationProps> = ({ component }) => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center', ...component.style }}>
    {component.props.showFirstLast && <button>First</button>}
    {component.props.showPrevNext && <button>Prev</button>}
    <span>{component.props.currentPage} / {component.props.totalPages}</span>
    {component.props.showPrevNext && <button>Next</button>}
    {component.props.showFirstLast && <button>Last</button>}
  </div>
);
