import React from 'react';
import './Timeline.css';

export interface TimelineItem {
  key: string;
  label: string;
  content?: React.ReactNode;
  color?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <ul className="custom-timeline">
      {items.map(item => (
        <li className="custom-timeline-item" key={item.key}>
          <span className="custom-timeline-dot" style={{ borderColor: item.color || '#6366f1' }} />
          <div><strong>{item.label}</strong></div>
          {item.content && <div>{item.content}</div>}
        </li>
      ))}
    </ul>
  );
};
