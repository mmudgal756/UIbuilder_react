import React from 'react';
import './Slider.css';

export interface SliderProps {
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = true
}) => {
  return (
    <div className="custom-slider-wrapper">
      <input
        type="range"
        className="custom-slider"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={e => onChange?.(Number(e.target.value))}
        disabled={disabled}
      />
      {showValue && <span style={{ marginLeft: 8 }}>{value}</span>}
    </div>
  );
};
