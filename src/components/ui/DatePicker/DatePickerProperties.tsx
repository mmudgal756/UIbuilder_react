import React from 'react';
import { DatePickerProps } from './DatePicker';
import BindingEditor from '../BindingEditor';
import ActionBuilder, { ActionDescriptor } from '../ActionBuilder';

interface DatePickerPropertiesPanelProps {
  value: DatePickerProps & {
    validation?: { required?: boolean };
    onChangeAction?: ActionDescriptor | string;
    visible?: string;
  };
  onChange: (value: DatePickerProps & {
    validation?: { required?: boolean };
    onChangeAction?: ActionDescriptor | string;
    visible?: string;
  }) => void;
}

export const DatePickerPropertiesPanel: React.FC<DatePickerPropertiesPanelProps> = ({ value, onChange }) => {
  // Helper for validation
  const handleValidationChange = (key: 'required', val: boolean) => {
    onChange({
      ...value,
      validation: { ...value.validation, [key]: val },
    });
  };

  return (
    <div className="space-y-6">
      {/* Content Section */}
      <div>
        <div className="font-semibold mb-2">Content</div>
        <label className="block mb-1 text-sm">Value
          <BindingEditor value={value.value} onChange={v => onChange({ ...value, value: v })} />
          <span className="block text-xs text-gray-400">Supports dynamic binding (e.g. {'{{form.date}}'})</span>
        </label>
        <label className="block mb-1 text-sm">Placeholder
          <input type="text" className="w-full p-1 rounded bg-gray-800 border border-gray-700" value={value.placeholder || ''} onChange={e => onChange({ ...value, placeholder: e.target.value })} />
        </label>
        <label className="block mb-1 text-sm">Min
          <input type="date" className="w-full p-1 rounded bg-gray-800 border border-gray-700" value={value.min || ''} onChange={e => onChange({ ...value, min: e.target.value })} />
        </label>
        <label className="block mb-1 text-sm">Max
          <input type="date" className="w-full p-1 rounded bg-gray-800 border border-gray-700" value={value.max || ''} onChange={e => onChange({ ...value, max: e.target.value })} />
        </label>
      </div>

      {/* Validation Section */}
      <div>
        <div className="font-semibold mb-2">Validation</div>
        <label className="block mb-1 text-sm">Required
          <input type="checkbox" checked={!!value.validation?.required} onChange={e => handleValidationChange('required', e.target.checked)} />
        </label>
      </div>

      {/* Events Section */}
      <div>
        <div className="font-semibold mb-2">Events</div>
        <label className="block mb-1 text-sm">onChange Action
          <ActionBuilder value={value.onChangeAction} onChange={v => onChange({ ...value, onChangeAction: v })} />
          <span className="block text-xs text-gray-400">Run query, JS, or navigate on change</span>
        </label>
      </div>

      {/* Advanced Section */}
      <div>
        <div className="font-semibold mb-2">Advanced</div>
        <label className="block mb-1 text-sm">Visible
          <BindingEditor value={value.visible || ''} onChange={v => onChange({ ...value, visible: v })} />
          <span className="block text-xs text-gray-400">Show/hide based on JS expression (e.g. {'{{form.isVisible}}'})</span>
        </label>
        <label className="block mb-1 text-sm">Disabled
          <input type="checkbox" checked={!!value.disabled} onChange={e => onChange({ ...value, disabled: e.target.checked })} />
        </label>
      </div>
    </div>
  );
};
