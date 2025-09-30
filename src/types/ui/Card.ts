export interface CardProps {
  title?: string;
  content?: string;
  footer?: string | unknown;
  [key: string]: unknown;
}

export type CardDefaultProps = Partial<CardProps>;

