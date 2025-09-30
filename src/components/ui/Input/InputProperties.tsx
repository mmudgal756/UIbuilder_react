import React from 'react';
import { InputProps } from './Input';
import BindingEditor from '../BindingEditor';
import ActionBuilder, { ActionDescriptor } from '../ActionBuilder';

interface InputValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

interface InputPropertiesPanelProps {
  value: InputProps & {
    validation?: InputValidation;
    onChangeAction?: ActionDescriptor | string;
    visible?: string;
  };
  onChange: (value: InputProps & {
    validation?: InputValidation;
    onChangeAction?: ActionDescriptor | string;
    visible?: string;
  }) => void;
}

export const InputPropertiesPanel: React.FC<InputPropertiesPanelProps> = ({ value, onChange }) => {
  // Helper for validation
  const handleValidationChange = (key: keyof InputValidation, val: boolean | number | string | undefined) => {
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
          <span className="block text-xs text-gray-400">Supports dynamic binding (e.g. {'{{user.name}}'})</span>
        </label>
        <label className="block mb-1 text-sm">Placeholder
          <input type="text" className="w-full p-1 rounded bg-gray-800 border border-gray-700" value={value.placeholder || ''} onChange={e => onChange({ ...value, placeholder: e.target.value })} />
          <span className="block text-xs text-gray-400">Shown when input is empty</span>
        </label>
        <label className="block mb-1 text-sm">Type
          <select className="w-full p-1 rounded bg-gray-800 border border-gray-700" value={value.type} onChange={e => onChange({ ...value, type: e.target.value as 'text' | 'password' | 'email' | 'number' })}>
            <option value="text">Text</option>
            <option value="password">Password</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
          </select>
        </label>
      </div>

      {/* Validation Section */}
      <div>
        <div className="font-semibold mb-2">Validation</div>
        <label className="block mb-1 text-sm">Required
          <input type="checkbox" checked={!!value.validation?.required} onChange={e => handleValidationChange('required', e.target.checked)} />
        </label>
        <label className="block mb-1 text-sm">Min Length
          <input type="number" className="w-full p-1 rounded bg-gray-800 border border-gray-700" value={value.validation?.minLength ?? ''} onChange={e => handleValidationChange('minLength', e.target.value ? Number(e.target.value) : undefined)} />
        </label>
        <label className="block mb-1 text-sm">Max Length
          <input type="number" className="w-full p-1 rounded bg-gray-800 border border-gray-700" value={value.validation?.maxLength ?? ''} onChange={e => handleValidationChange('maxLength', e.target.value ? Number(e.target.value) : undefined)} />
        </label>
        <label className="block mb-1 text-sm">Pattern (Regex)
          <input type="text" className="w-full p-1 rounded bg-gray-800 border border-gray-700" value={value.validation?.pattern ?? ''} onChange={e => handleValidationChange('pattern', e.target.value)} placeholder="e.g. ^[A-Za-z0-9]+$" />
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
        <label className="block mb-1 text-sm">Error
          <input type="checkbox" checked={!!value.error} onChange={e => onChange({ ...value, error: e.target.checked })} />
        </label>
      </div>
    </div>
  );
};
