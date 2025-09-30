export interface ButtonProps {
  text?: string;
  variant?: 'primary' | 'secondary' | string;
  onClick?: (...args: unknown[]) => void;
  disabled?: boolean;
  [key: string]: unknown;
}

export type ButtonDefaultProps = Partial<ButtonProps>;
