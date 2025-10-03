import React from 'react';
import { ComponentData } from '../../../types';
import { ChartLib } from './ChartLib';
import { ChartProps } from '../../../types/ui/Chart';

export interface UIChartProps extends ChartProps {
  component: ComponentData;
  isPreview?: boolean;
}

export const Chart: React.FC<UIChartProps> = ({ component }) => {
  const {
    chartType = component.props?.type || 'bar',
    data = component.props?.data || [],
    title = component.props?.title || '',
    xAxisLabel = component.props?.xAxisLabel || '',
    yAxisLabel = component.props?.yAxisLabel || '',
  } = component.props || {};

  return (
    <div className="custom-chart flex flex-col items-center w-full">
      <ChartLib
        type={chartType}
        data={Array.isArray(data) ? data : []}
        title={title}
        xAxisLabel={xAxisLabel}
        yAxisLabel={yAxisLabel}
      />
    </div>
  );
};
