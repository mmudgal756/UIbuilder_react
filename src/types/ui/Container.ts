// Container (layout) component types
export interface ContainerProps {
  children?: unknown;
  padding?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  [key: string]: unknown;
}

export type ContainerDefaultProps = Partial<ContainerProps>;
