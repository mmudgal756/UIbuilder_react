import React from 'react';
import { ComponentData } from '../../types';

export interface DatePickerProps { component: ComponentData; isPreview?: boolean }

export const DatePicker: React.FC<DatePickerProps> = ({ component }) => {
  return <input type="date" placeholder={component.props.placeholder} style={{ ...component.style }} />;
};
