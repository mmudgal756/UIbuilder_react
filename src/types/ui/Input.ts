export interface InputProps {
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number' | string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  [key: string]: unknown;
}

export type InputDefaultProps = Partial<InputProps>;
