import React, { useRef, useEffect } from 'react';
import './Chart.css';

export interface ChartProps {
  type: 'bar' | 'line' | 'pie';
  data: any;
  options?: any;
  width?: number;
  height?: number;
}

export const Chart: React.FC<ChartProps> = ({
  type,
  data,
  options,
  width = 400,
  height = 200
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    // You can integrate Chart.js or another charting library here
    // For now, just clear the canvas
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#6366f1';
      ctx.fillRect(10, 10, 100, 50); // Demo bar
    }
  }, [type, data, options, width, height]);

  return (
    <div className="custom-chart">
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};
