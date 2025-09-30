import React from 'react';
import { ComponentData } from '../../types';

export interface SelectProps { component: ComponentData; isPreview?: boolean }

export const Select: React.FC<SelectProps> = ({ component }) => {
  type Option = { value?: string; label?: string } | string;
  const options: Option[] = (component.props.options ?? []) as Option[];
  return (
    <select defaultValue={component.props.placeholder} className="p-2" style={{ ...component.style }}>
      <option value="" disabled>{component.props.placeholder || 'Select'}</option>
      {options.map((opt, i) => {
        if (typeof opt === 'string') return <option key={i} value={opt}>{opt}</option>;
        return <option key={i} value={opt.value ?? ''}>{opt.label ?? opt.value ?? ''}</option>;
      })}
    </select>
  );
};
