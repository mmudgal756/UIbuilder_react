import React from 'react';
import './Avatar.css';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  shape?: 'circle' | 'square';
  text?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  size = 40,
  shape = 'circle',
  text
}) => {
  const style = {
    width: size,
    height: size,
    borderRadius: shape === 'circle' ? '50%' : '8px',
    fontSize: size / 2.5
  };
  return (
    <span className="custom-avatar" style={style}>
      {src ? <img src={src} alt={alt} /> : text || alt?.[0] || '?'}
    </span>
  );
};
