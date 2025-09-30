export interface ChartProps {
  type?: 'bar' | 'line' | 'pie' | string;
  data?: unknown;
  xAxis?: string;
  yAxis?: string;
}

export type ChartDefaultProps = Partial<ChartProps>;
