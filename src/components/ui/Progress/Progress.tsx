import React from 'react';
import './Progress.css';

export interface ProgressProps {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
  height?: number;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  color = '#6366f1',
  showLabel = false,
  height = 16
}) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="custom-progress" style={{ height }}>
      <div className="custom-progress-bar" style={{ width: `${percent}%`, background: color }} />
      {showLabel && <span style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', color: '#22223b', fontWeight: 600 }}>{Math.round(percent)}%</span>}
    </div>
  );
};
