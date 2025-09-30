import React from 'react';
import './Text.css';

export interface TextProps {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Text: React.FC<TextProps> = ({
  text,
  bold = false,
  italic = false,
  underline = false,
  color,
  size = 'md',
}) => {
  const classNames = [
    'custom-text',
    bold ? 'bold' : '',
    italic ? 'italic' : '',
    underline ? 'underline' : '',
    size
  ].join(' ');
  return (
    <span className={classNames} style={{ color }}>{text}</span>
  );
};
