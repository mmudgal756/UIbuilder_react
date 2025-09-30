import React from 'react';
import './List.css';

export interface ListItem {
  key: string;
  content: React.ReactNode;
  onClick?: () => void;
}

export interface ListProps {
  items: ListItem[];
  bordered?: boolean;
  onItemClick?: (key: string) => void;
}

export const List: React.FC<ListProps> = ({ items, bordered = false, onItemClick }) => {
  return (
    <ul className={`custom-list${bordered ? ' bordered' : ''}`}>
      {items.map(item => (
        <li
          key={item.key}
          className="custom-list-item"
          onClick={() => {
            item.onClick?.();
            onItemClick?.(item.key);
          }}
        >
          {item.content}
        </li>
      ))}
    </ul>
  );
};
