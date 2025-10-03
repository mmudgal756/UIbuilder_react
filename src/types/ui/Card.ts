export interface CardProps {
  title?: string;
  content?: string;
  subtitle?: string;
  hoverable?: boolean;
  outlined?: boolean;
  [key: string]: unknown;
}

export type CardDefaultProps = Partial<CardProps>;

