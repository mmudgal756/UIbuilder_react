import React from 'react';
import './Breadcrumb.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, separator = '/' }) => {
  return (
    <nav className="custom-breadcrumb">
      {items.map((item, idx) => (
        <span className="breadcrumb-item" key={item.label + idx}>
          {item.href ? (
            <a href={item.href} onClick={item.onClick}>{item.label}</a>
          ) : (
            <span>{item.label}</span>
          )}
          {idx < items.length - 1 && <span className="breadcrumb-separator">{separator}</span>}
        </span>
      ))}
    </nav>
  );
};
