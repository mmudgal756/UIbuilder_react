import React, { useState } from 'react';
// Import all tool components for preview icons
import { Button } from './ui/Button/Button';
import { Text } from './ui/Text/Text';
import { Input } from './ui/Input/Input';
import { Card } from './ui/Card/Card';
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

const COMPONENT_CATEGORIES = [
  {
    name: 'Commonly Used',
    components: [
      { name: 'Button', icon: <Button label="Btn" /> },
      { name: 'Text', icon: <Text text="Aa" /> },
      { name: 'Input', icon: <Input value="" /> },
      { name: 'Select', icon: <Select value="" options={[]} /> },
      { name: 'Table', icon: <Table columns={[]} data={[]} /> },
      { name: 'Card', icon: <Card title="Card" /> },
      { name: 'Checkbox', icon: <Checkbox checked={false} /> },
      { name: 'Tabs', icon: <Tabs tabs={[]} /> },
      { name: 'Modal', icon: <Modal open={false} /> },
    ],
  },
  {
    name: 'Inputs',
    components: [
      { name: 'Radio', icon: <Radio checked={false} /> },
      { name: 'Switch', icon: <Switch checked={false} /> },
      { name: 'Slider', icon: <Slider value={50} /> },
      { name: 'DatePicker', icon: <DatePicker value="" /> },
      { name: 'FileUpload', icon: <FileUpload /> },
      { name: 'List', icon: <List items={[]} /> },
    ],
  },
  {
    name: 'Data Display',
    components: [
      { name: 'Avatar', icon: <Avatar text="A" /> },
      { name: 'Badge', icon: <Badge text="99+" /> },
      { name: 'Progress', icon: <Progress value={60} /> },
      { name: 'Chart', icon: <Chart type="bar" data={{}} /> },
      { name: 'Breadcrumb', icon: <Breadcrumb items={[{ label: 'Home' }]} /> },
      { name: 'Pagination', icon: <Pagination page={1} pageSize={10} total={100} /> },
      { name: 'Timeline', icon: <Timeline items={[]} /> },
      { name: 'Map', icon: <Map lat={0} lng={0} /> },
    ],
  },
];

export const ComponentLibraryPanel: React.FC = () => {
  const [search, setSearch] = useState('');
  return (
    <div style={{ width: 320, background: '#f8fafc', height: '100vh', overflowY: 'auto', borderRight: '1px solid #e5e7eb' }}>
      <div style={{ padding: 16, borderBottom: '1px solid #e5e7eb' }}>
        <input
          type="text"
          placeholder="Search components"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #cbd5e1' }}
        />
      </div>
      {COMPONENT_CATEGORIES.map(category => {
        const filtered = category.components.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
        if (filtered.length === 0) return null;
        return (
          <div key={category.name} style={{ padding: '16px 0' }}>
            <div style={{ fontWeight: 700, color: '#6366f1', padding: '0 16px 8px 16px' }}>{category.name}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, padding: '0 16px' }}>
              {filtered.map(comp => (
                <div key={comp.name} style={{ width: 64, height: 64, background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #e5e7eb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 12 }}>
                  <div style={{ marginBottom: 4 }}>{comp.icon}</div>
                  <span>{comp.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
