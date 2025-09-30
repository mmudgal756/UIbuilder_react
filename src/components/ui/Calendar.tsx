import React from 'react';
import { ComponentData } from '../../types';

export interface CalendarProps { component: ComponentData; isPreview?: boolean }

export const Calendar: React.FC<CalendarProps> = ({ component }) => (
  <div style={{ ...component.style }}>Calendar (placeholder)</div>
);
