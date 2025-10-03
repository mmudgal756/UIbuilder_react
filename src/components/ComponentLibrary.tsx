import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
// Import all UI components for preview from their folders
import { Text } from './ui/Text/Text';
import { Input } from './ui/Input/Input';
import { Checkbox } from './ui/Checkbox/Checkbox';
import { Select } from './ui/Select/Select';
import { Table } from './ui/Table/Table';
import { Tabs } from './ui/Tabs/Tabs';
import { Modal } from './ui/Modal/Modal';
import { Radio } from './ui/Radio/Radio';
import { Switch } from './ui/Switch/Switch';
import { Slider } from './ui/Slider/Slider';
import { DatePicker } from './ui/DatePicker/DatePicker';
import { FileUpload } from './ui/FileUpload/FileUpload';
import { Avatar } from './ui/Avatar/Avatar';
import { Badge } from './ui/Badge/Badge';
import { Progress } from './ui/Progress/Progress';
import { Chart } from './ui/Chart/Chart';
import { Breadcrumb } from './ui/Breadcrumb/Breadcrumb';
import { Pagination } from './ui/Pagination/Pagination';
import { List } from './ui/List/List';
import { Map } from './ui/Map/Map';
import { Timeline } from './ui/Timeline/Timeline';
import Button from './ui/Button/Button';
import { Card } from './ui/Card/Card';
// ...add more imports as you add more UI tools

// Component meta for rendering and drag info
const COMPONENTS = [
  {
    type: 'button',
    name: 'Button',
    category: 'basic',
    component: Button,
    previewProps: { label: 'Button', variant: 'primary' },
    defaultProps: {
      label: 'Button',
      variant: 'primary',
      size: 'md',
      icon: undefined,
      loading: false,
      disabled: false,
      onClick: undefined
    },
    defaultSize: { width: 120, height: 40 },
    defaultStyle: { backgroundColor: '#2563EB ', color: 'white', borderRadius: '6px', border: 'none', padding: '8px 16px', cursor: 'pointer' }
  },
  {
    type: 'text',
    name: 'Text',
    category: 'basic',
    component: Text,
    previewProps: { content: 'Sample Text', fontSize: '16px' },
    defaultProps: { content: 'Sample Text', fontSize: '16px' },
    defaultSize: { width: 150, height: 30 },
    defaultStyle: { color: '#1F2937', lineHeight: '1.5' },
  },
  {
    type: 'input',
    name: 'Input',
    category: 'form',
    component: Input,
    previewProps: { placeholder: 'Enter text...' },
    defaultProps: { placeholder: 'Enter text...', type: 'text' },
    defaultSize: { width: 200, height: 40 },
    defaultStyle: { border: '1px solid #D1D5DB', borderRadius: '6px', padding: '8px 12px', fontSize: '14px' },
  },
  {
    type: 'card',
    name: 'Card',
    category: 'layout',
    component: Card,
    previewProps: { title: 'Card Title', subtitle: 'Card content' },
    defaultProps: { title: 'Card Title', subtitle: 'Card content' },
    defaultSize: { width: 300, height: 200 },
    defaultStyle: { backgroundColor: '#2563EB', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  },
  {
    type: 'checkbox',
    name: 'Checkbox',
    category: 'form',
    component: Checkbox,
    previewProps: { label: 'Checkbox', checked: false },
    defaultProps: { label: 'Checkbox', checked: false },
    defaultSize: { width: 150, height: 24 },
    defaultStyle: { display: 'flex', alignItems: 'center', gap: '8px' },
  },
  {
    type: 'select',
    name: 'Select',
    category: 'form',
    component: Select,
    previewProps: { options: ['Option 1', 'Option 2'], placeholder: 'Select...' },
    defaultProps: { options: ['Option 1', 'Option 2'], placeholder: 'Select...' },
    defaultSize: { width: 200, height: 40 },
    defaultStyle: { border: '1px solid #D1D5DB', borderRadius: '6px', padding: '8px 12px', backgroundColor: 'white' },
  },
  {
    type: 'table',
    name: 'Table',
    category: 'data',
    component: Table,
    previewProps: {
      columns: [
        { key: 'name', title: 'Name', dataIndex: 'name' },
        { key: 'email', title: 'Email', dataIndex: 'email' }
      ],
      data: [{ name: 'John', email: 'john@mail.com' }]
    },
    defaultProps: {
      columns: [
        { key: 'name', title: 'Name', dataIndex: 'name' },
        { key: 'email', title: 'Email', dataIndex: 'email' }
      ],
      data: [],
      striped: true,
      hover: true,
      pagination: true,
      pageSize: 10,
      onRowClick: undefined
    },
    defaultSize: { width: 500, height: 300 },
    defaultStyle: { border: '1px solid #E5E7EB', borderRadius: '6px', backgroundColor: 'white' }
  },
  {
    type: 'tabs',
    name: 'Tabs',
    category: 'advanced',
    component: Tabs,
    previewProps: { tabs: [{ label: 'Tab 1', content: 'Content 1' }, { label: 'Tab 2', content: 'Content 2' }], activeTab: 0 },
    defaultProps: { tabs: [{ label: 'Tab 1', content: 'Content 1' }, { label: 'Tab 2', content: 'Content 2' }], activeTab: 0 },
    defaultSize: { width: 400, height: 250 },
    defaultStyle: { border: '1px solid #E5E7EB', borderRadius: '6px', backgroundColor: 'white' },
  },
  {
    type: 'modal',
    name: 'Modal',
    category: 'advanced',
    component: Modal,
    previewProps: { title: 'Modal Title', content: 'Modal content', isOpen: false },
    defaultProps: { title: 'Modal Title', content: 'Modal content', isOpen: false },
    defaultSize: { width: 400, height: 300 },
    defaultStyle: { backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' },
  },
  {
    type: 'radio',
    name: 'Radio',
    category: 'form',
    component: Radio,
    previewProps: { label: 'Radio', name: 'group', value: '1' },
    defaultProps: { label: 'Radio', name: 'group', value: '1' },
    defaultSize: { width: 150, height: 24 },
    defaultStyle: { display: 'flex', alignItems: 'center', gap: '8px' },
  },
  {
    type: 'switch',
    name: 'Switch',
    category: 'form',
    component: Switch,
    previewProps: { label: 'Switch', checked: false },
    defaultProps: { label: 'Switch', checked: false },
    defaultSize: { width: 120, height: 32 },
    defaultStyle: { display: 'flex', alignItems: 'center', gap: '8px' },
  },
  {
    type: 'slider',
    name: 'Slider',
    category: 'form',
    component: Slider,
    previewProps: { min: 0, max: 100, value: 50 },
    defaultProps: { min: 0, max: 100, value: 50, step: 1 },
    defaultSize: { width: 200, height: 24 },
    defaultStyle: { width: '100%' },
  },
  {
    type: 'datepicker',
    name: 'Date Picker',
    category: 'form',
    component: DatePicker,
    previewProps: { placeholder: 'Pick a date' },
    defaultProps: { placeholder: 'Pick a date', format: 'YYYY-MM-DD' },
    defaultSize: { width: 200, height: 40 },
    defaultStyle: { border: '1px solid #D1D5DB', borderRadius: '6px', padding: '8px 12px' },
  },
  {
    type: 'fileupload',
    name: 'File Upload',
    category: 'form',
    component: FileUpload,
    previewProps: { label: 'Upload CSV', accept: '.csv', multiple: false },
    defaultProps: {
      label: 'Upload CSV',
      accept: '.csv',
      multiple: false,
      disabled: false,
      onChange: undefined
    },
    defaultSize: { width: 300, height: 120 },
    defaultStyle: { border: '2px dashed #D1D5DB', borderRadius: '6px', padding: '20px', textAlign: 'center' }
  },
  {
    type: 'avatar',
    name: 'Avatar',
    category: 'advanced',
    component: Avatar,
    previewProps: { name: 'John Doe', size: 'md' },
    defaultProps: { src: '', name: 'John Doe', size: 'md', shape: 'circle' },
    defaultSize: { width: 48, height: 48 },
    defaultStyle: { borderRadius: '50%', backgroundColor: '#E5E7EB' },
  },
  {
    type: 'badge',
    name: 'Badge',
    category: 'advanced',
    component: Badge,
    previewProps: { text: 'Badge', variant: 'primary' },
    defaultProps: { text: 'Badge', variant: 'primary', size: 'sm' },
    defaultSize: { width: 60, height: 24 },
    defaultStyle: { backgroundColor: '#3B82F6', color: 'white', borderRadius: '12px', padding: '2px 8px', fontSize: '12px' },
  },
  {
    type: 'progress',
    name: 'Progress',
    category: 'advanced',
    component: Progress,
    previewProps: { value: 60, max: 100 },
    defaultProps: { value: 50, max: 100, showLabel: true },
    defaultSize: { width: 200, height: 24 },
    defaultStyle: { width: '100%', height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px' },
  },
  {
    type: 'chart',
    name: 'Chart',
    category: 'data',
    component: Chart,
    previewProps: { type: 'bar', data: [
      { x: 'Product1', y: 20000 },
      { x: 'Product2', y: 22000 },
      { x: 'Product3', y: 32000 },
    ], xAxisLabel: 'Product Line', yAxisLabel: 'Revenue($)', title: 'Sales Report' },
    defaultProps: {
      type: 'bar',
      data: [
        { x: 'Product1', y: 20000 },
        { x: 'Product2', y: 22000 },
        { x: 'Product3', y: 32000 },
      ],
      xAxisLabel: 'Product Line',
      yAxisLabel: 'Revenue($)',
      title: 'Sales Report',
    },
    defaultSize: { width: 400, height: 300 },
    defaultStyle: { border: '1px solid #E5E7EB', borderRadius: '6px', padding: '16px' },
  },
  {
    type: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'advanced',
    component: Breadcrumb,
    previewProps: { items: [{ label: 'Home', href: '/' }, { label: 'Page' }] },
    defaultProps: { items: [{ label: 'Home', href: '/' }, { label: 'Page' }] },
    defaultSize: { width: 300, height: 32 },
    defaultStyle: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' },
  },
  {
    type: 'pagination',
    name: 'Pagination',
    category: 'advanced',
    component: Pagination,
    previewProps: { currentPage: 1, totalPages: 5 },
    defaultProps: { currentPage: 1, totalPages: 10, showFirstLast: true, showPrevNext: true },
    defaultSize: { width: 300, height: 40 },
    defaultStyle: { display: 'flex', alignItems: 'center', gap: '4px' },
  },
  {
    type: 'list',
    name: 'List',
    category: 'data',
    component: List,
    previewProps: { items: ['Item 1', 'Item 2'] },
    defaultProps: { items: ['Item 1', 'Item 2', 'Item 3'], ordered: false },
    defaultSize: { width: 250, height: 200 },
    defaultStyle: { padding: '8px', backgroundColor: 'white', borderRadius: '6px' },
  },
  {
    type: 'map',
    name: 'Map',
    category: 'media',
    component: Map,
    previewProps: { center: { lat: 0, lng: 0 }, zoom: 1, markers: [] },
    defaultProps: { center: { lat: 40.7128, lng: -74.0060 }, zoom: 10, markers: [] },
    defaultSize: { width: 400, height: 300 },
    defaultStyle: { borderRadius: '6px', backgroundColor: '#E5E7EB' },
  },
  {
    type: 'timeline',
    name: 'Timeline',
    category: 'advanced',
    component: Timeline,
    previewProps: { items: [{ title: 'Event', description: 'Desc', date: '2024-01-01' }] },
    defaultProps: { items: [{ title: 'Event 1', description: 'Description 1', date: '2024-01-01' }] },
    defaultSize: { width: 300, height: 200 },
    defaultStyle: { padding: '16px' },
  },
  // ...add more as needed
];

  // Removed unused CATEGORIES

// Use 'any' for comp and previewProps to avoid type errors for dynamic heterogeneous components
// --- Type Definitions ---
export type ComponentMeta = {
  type: string;
  name: string;
  defaultProps: Record<string, unknown>;
  defaultSize?: { width: number; height: number };
  defaultStyle?: Record<string, unknown>;
  category: string;
  component: React.ElementType;
  previewProps?: Record<string, unknown>;
};

// Simple SVG icon mapping for each component type
const componentIcons: Record<string, JSX.Element> = {
  Text: (
    <svg width="22" height="22" fill="none" stroke="#6366F1" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="2" rx="1"/><rect x="4" y="11" width="10" height="2" rx="1"/><rect x="4" y="16" width="7" height="2" rx="1"/></svg>
  ),
  Input: (
    <svg width="22" height="22" fill="none" stroke="#6366F1" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="8" rx="2"/><rect x="6" y="11" width="2" height="2" rx="1"/></svg>
  ),
  Checkbox: (
    <svg width="22" height="22" fill="none" stroke="#6366F1" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 12l3 3 5-5"/></svg>
  ),
  Select: (
    <svg width="22" height="22" fill="none" stroke="#6366F1" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="4" rx="2"/><path d="M8 17h8"/></svg>
  ),
  Radio: (
    <svg width="22" height="22" fill="none" stroke="#6366F1" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3" fill="#6366F1"/></svg>
  ),
  Switch: (
    <svg width="22" height="22" fill="none" stroke="#6366F1" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="9" width="18" height="6" rx="3"/><circle cx="9" cy="12" r="3" fill="#6366F1"/></svg>
  ),
  Slider: (
    <svg width="22" height="22" fill="none" stroke="#6366F1" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="2" rx="1"/><circle cx="12" cy="12" r="3" fill="#6366F1"/></svg>
  ),
  'Date Picker': (
    <svg width="22" height="22" fill="none" stroke="#6366F1" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 9h18"/></svg>
  ),
  'File Upload': (
    <svg width="22" height="22" fill="none" stroke="#6366F1" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v6m0 0l-3-3m3 3l3-3"/></svg>
  ),
  Card: (
    <svg width="22" height="22" fill="none" stroke="#6366F1" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="3"/><path d="M4 10h16"/></svg>
  ),
};

const ComponentPreviewItem: React.FC<{ comp: ComponentMeta; usePreview?: boolean }> = ({ comp, usePreview }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: {
      componentType: comp.type,
      definition: {
        type: comp.type,
        name: comp.name,
        defaultProps: comp.defaultProps,
        defaultSize: comp.defaultSize,
        defaultStyle: comp.defaultStyle,
        category: comp.category,
      },
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const Comp = comp.component;
  // Use icon if available, fallback to generic box
  const icon = componentIcons[comp.name] || (
    <svg width="22" height="22" fill="none" stroke="#6366F1" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/></svg>
  );
  return (
    <div
      ref={drag}
      className={`flex flex-col items-center gap-1 rounded-lg border border-gray-200 bg-white shadow-sm px-2 py-2 mb-2 cursor-pointer transition-all hover:shadow-md hover:border-blue-400 ${isDragging ? 'opacity-50 border-blue-500' : ''}`}
      style={{ minHeight: 70, minWidth: 70, maxWidth: 90, userSelect: 'none', transition: 'box-shadow 0.18s, border 0.18s, background 0.18s' }}
      title={comp.name}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: 36,
          height: 36,
          background: '#F3F4F6',
          borderRadius: 8,
          border: '1px solid #E5E7EB',
          overflow: 'hidden',
          pointerEvents: 'none',
          display: 'flex',
          transition: 'background 0.18s',
        }}
      >
        {usePreview ? <Comp {...comp.previewProps} /> : icon}
      </div>
      <span
        className="text-xs font-medium text-gray-800 truncate mt-1 text-center"
        style={{ pointerEvents: 'none', fontFamily: 'Inter, sans-serif', fontSize: 13, transition: 'color 0.18s', maxWidth: 80 }}
      >
        {comp.name}
      </span>
    </div>
  );
};

export const ComponentLibrary: React.FC = () => {
  const [search, setSearch] = useState('');

  // Group components by category
  const grouped: Record<string, ComponentMeta[]> = {};
  (COMPONENTS as ComponentMeta[]).forEach((c) => {
    if (!grouped[c.category]) grouped[c.category] = [];
    grouped[c.category].push(c);
  });

  // Filter by search
  const filterComp = (c: ComponentMeta) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase());

  // Category display names
  const CATEGORY_LABELS: Record<string, string> = {
    basic: 'Suggested',
    form: 'Inputs',
    data: 'Data',
    layout: 'Layout',
    media: 'Media',
    advanced: 'Buttons',
  };

  return (
    <div className="h-full overflow-y-auto bg-[#F8FAFC] border-r border-gray-200" style={{ minWidth: 260, maxWidth: 320 }}>
      <div className="px-4 pt-4 pb-2 sticky top-0 z-10 bg-[#F8FAFC] border-b border-gray-100">
        <h3 className="text-base font-semibold mb-2 text-gray-900">Drag & drop UI elements</h3>
        <input
          type="text"
          placeholder="Search UI elements"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-3 py-2 mb-2 rounded border border-gray-300 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <div className="px-4 pt-2 pb-6">
        {Object.keys(grouped).map((cat) => {
          const comps = grouped[cat].filter(filterComp);
          if (comps.length === 0) return null;
          // For Buttons section, use real previews in a row
          if ((CATEGORY_LABELS[cat] || cat) === 'Buttons') {
            return (
              <div key={cat} className="mb-6">
                <div className="text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">{CATEGORY_LABELS[cat] || cat}</div>
                <div className="flex flex-wrap gap-3 mb-2">
                  {comps.map((comp) => (
                    <ComponentPreviewItem key={comp.type} comp={comp} usePreview />
                  ))}
                </div>
              </div>
            );
          }
          // Default: icon style
          return (
            <div key={cat} className="mb-6">
              <div className="text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">{CATEGORY_LABELS[cat] || cat}</div>
              <div className="flex flex-wrap gap-3 mb-2">
                {comps.map((comp) => (
                  <ComponentPreviewItem key={comp.type} comp={comp} />
                ))}
              </div>

            </div>
          );
        })}
        {/* No results */}
        {Object.values(grouped).flat().filter(filterComp).length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">No components found</p>
          </div>
        )}
      </div>
    </div>
  );
};