
import React, { useRef, useEffect } from 'react';
import './Chart.css';
import { ComponentData } from '../../../types';
import { ChartProps } from '../../../types/ui/Chart';

export interface UIChartProps  extends ChartProps{
  component: ComponentData;
  isPreview?: boolean;
}

export const Chart: React.FC<UIChartProps> = ({ component, isPreview }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Extract chart props from component.props
  const {
    chartType = component.props?.type || 'line',
    data = component.props?.data || [],
    title = component.props?.title || '',
    xAxisLabel = component.props?.xAxisLabel || '',
    yAxisLabel = component.props?.yAxisLabel || '',
  } = component.props || {};

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, 400, 200);

    if (!Array.isArray(data) || data.length === 0) return;

    if (chartType === 'bar') {
      // Simple bar chart
      const barWidth = 400 / data.length - 10;
      const maxVal = Math.max(...data.map((d: any) => d.y));
      data.forEach((d: any, i: number) => {
        const barHeight = (d.y / maxVal) * (200 - 40);
        ctx.fillStyle = '#6366f1';
        ctx.fillRect(i * (barWidth + 10) + 30, 200 - barHeight - 20, barWidth, barHeight);
        ctx.fillStyle = '#222';
        ctx.fillText(d.x, i * (barWidth + 10) + 30, 200 - 5);
      });
    } else if (chartType === 'line') {
      // Simple line chart
      const maxVal = Math.max(...data.map((d: any) => d.y));
      ctx.strokeStyle = '#6366f1';
      ctx.beginPath();
      data.forEach((d: any, i: number) => {
        const x = i * (400 / (data.length - 1)) + 30;
        const y = 200 - ((d.y / maxVal) * (200 - 40)) - 20;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
      });
      ctx.stroke();
      ctx.fillStyle = '#222';
      data.forEach((d: any, i: number) => {
        const x = i * (400 / (data.length - 1)) + 30;
        ctx.fillText(d.x, x, 200 - 5);
      });
    } else if (chartType === 'pie') {
      // Simple pie chart
      const total = data.reduce((sum: number, d: any) => sum + d.y, 0);
      let startAngle = 0;
      data.forEach((d: any, i: number) => {
        const sliceAngle = (d.y / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(400 / 2, 200 / 2);
        ctx.arc(400 / 2, 200 / 2, Math.min(400, 200) / 2 - 20, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = ['#6366f1', '#f59e42', '#10b981', '#ef4444', '#fbbf24'][i % 5];
        ctx.fill();
        startAngle += sliceAngle;
      });
    }
  }, [chartType, data]);

  return (
    <div className="custom-chart flex flex-col items-center">
      {/* Chart Title */}
      {title && (
        <div className="font-semibold text-lg mb-2 text-center text-white" >{title}</div>
      )}
      <div className="flex flex-row items-center w-full">
        {/* Y Axis Label */}
        {yAxisLabel && (
          <div  className="flex items-center justify-center mr-2">
            <span style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap', color: '#d1d5db', fontSize: 12 }}>{yAxisLabel}</span>
          </div>
        )}
        <div className="relative">
          <canvas ref={canvasRef} width={400} height={200} />
        </div>
      </div>
      {/* X Axis Label */}
      {xAxisLabel && (
        <div className="mt-2 text-center text-gray-300">{xAxisLabel}</div>
      )}
    </div>
  );
};
