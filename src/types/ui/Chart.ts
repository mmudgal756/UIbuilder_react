
export interface ChartProps {
  type?: 'bar' | 'line' | 'pie' | string;
  data?: unknown;
  xAxis?: string;
  yAxis?: string;
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  width?: number;
  height?: number;
}

export type ChartDefaultProps = Partial<ChartProps>;
