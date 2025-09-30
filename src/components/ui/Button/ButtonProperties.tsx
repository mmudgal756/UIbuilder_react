import React from 'react';
import { ButtonProps } from './Button';
import BindingEditor from '../BindingEditor';
import ActionBuilder, { ActionDescriptor } from '../ActionBuilder';

interface ButtonPropertiesPanelProps {
  value: ButtonProps & {
    onClickAction?: ActionDescriptor | string;
    visible?: string;
  };
  onChange: (value: ButtonProps & {
    onClickAction?: ActionDescriptor | string;
    visible?: string;
  }) => void;
}

export const ButtonPropertiesPanel: React.FC<ButtonPropertiesPanelProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Content Section */}
      <div>
        <div className="font-semibold mb-2">Content</div>
        <label className="block mb-1 text-sm">Label
          <BindingEditor value={value.label} onChange={v => onChange({ ...value, label: v })} />
          <span className="block text-xs text-gray-400">Supports dynamic binding (e.g. {'{{user.action}}'})</span>
        </label>
        <label className="block mb-1 text-sm">Variant
          <select className="w-full p-1 rounded bg-gray-800 border border-gray-700" value={value.variant} onChange={e => onChange({ ...value, variant: e.target.value as ButtonProps['variant'] })}>
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="danger">Danger</option>
          </select>
        </label>
        <label className="block mb-1 text-sm">Size
          <select className="w-full p-1 rounded bg-gray-800 border border-gray-700" value={value.size} onChange={e => onChange({ ...value, size: e.target.value as ButtonProps['size'] })}>
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </label>
      </div>

      {/* Events Section */}
      <div>
        <div className="font-semibold mb-2">Events</div>
        <label className="block mb-1 text-sm">onClick Action
          <ActionBuilder value={value.onClickAction} onChange={v => onChange({ ...value, onClickAction: v })} />
          <span className="block text-xs text-gray-400">Run query, JS, or navigate on click</span>
        </label>
      </div>

      {/* Advanced Section */}
      <div>
        <div className="font-semibold mb-2">Advanced</div>
        <label className="block mb-1 text-sm">Visible
          <BindingEditor value={value.visible || ''} onChange={v => onChange({ ...value, visible: v })} />
          <span className="block text-xs text-gray-400">Show/hide based on JS expression (e.g. {'{{user.canSee}}'})</span>
        </label>
        <label className="block mb-1 text-sm">Disabled
          <input type="checkbox" checked={!!value.disabled} onChange={e => onChange({ ...value, disabled: e.target.checked })} />
        </label>
        <label className="block mb-1 text-sm">Loading
          <input type="checkbox" checked={!!value.loading} onChange={e => onChange({ ...value, loading: e.target.checked })} />
        </label>
      </div>
    </div>
  );
};
