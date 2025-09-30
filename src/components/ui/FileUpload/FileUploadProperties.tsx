import React from 'react';
import { FileUploadProps } from './FileUpload';
import BindingEditor from '../BindingEditor';
import ActionBuilder, { ActionDescriptor } from '../ActionBuilder';

interface FileUploadPropertiesPanelProps {
  value: FileUploadProps & {
    validation?: { required?: boolean; maxSizeMB?: number; allowedTypes?: string };
    onChangeAction?: ActionDescriptor | string;
    visible?: string;
  };
  onChange: (value: FileUploadProps & {
    validation?: { required?: boolean; maxSizeMB?: number; allowedTypes?: string };
    onChangeAction?: ActionDescriptor | string;
    visible?: string;
  }) => void;
}

export const FileUploadPropertiesPanel: React.FC<FileUploadPropertiesPanelProps> = ({ value, onChange }) => {
  // Helper for validation
  const handleValidationChange = (key: 'required' | 'maxSizeMB' | 'allowedTypes', val: boolean | number | string | undefined) => {
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
        <label className="block mb-1 text-sm">Label
          <BindingEditor value={value.label || ''} onChange={v => onChange({ ...value, label: v })} />
        </label>
        <label className="block mb-1 text-sm">Accept
          <input type="text" className="w-full p-1 rounded bg-gray-800 border border-gray-700" value={value.accept || ''} onChange={e => onChange({ ...value, accept: e.target.value })} placeholder="e.g. image/*, .pdf" />
        </label>
        <label className="block mb-1 text-sm">Multiple
          <input type="checkbox" checked={!!value.multiple} onChange={e => onChange({ ...value, multiple: e.target.checked })} />
        </label>
      </div>

      {/* Validation Section */}
      <div>
        <div className="font-semibold mb-2">Validation</div>
        <label className="block mb-1 text-sm">Required
          <input type="checkbox" checked={!!value.validation?.required} onChange={e => handleValidationChange('required', e.target.checked)} />
        </label>
        <label className="block mb-1 text-sm">Max Size (MB)
          <input type="number" className="w-full p-1 rounded bg-gray-800 border border-gray-700" value={value.validation?.maxSizeMB ?? ''} onChange={e => handleValidationChange('maxSizeMB', e.target.value ? Number(e.target.value) : undefined)} />
        </label>
        <label className="block mb-1 text-sm">Allowed Types
          <input type="text" className="w-full p-1 rounded bg-gray-800 border border-gray-700" value={value.validation?.allowedTypes ?? ''} onChange={e => handleValidationChange('allowedTypes', e.target.value)} placeholder="e.g. image/*, .pdf" />
        </label>
      </div>

      {/* Events Section */}
      <div>
        <div className="font-semibold mb-2">Events</div>
        <label className="block mb-1 text-sm">onChange Action
          <ActionBuilder value={value.onChangeAction} onChange={v => onChange({ ...value, onChangeAction: v })} />
          <span className="block text-xs text-gray-400">Run query, JS, or upload on change</span>
        </label>
      </div>

      {/* Advanced Section */}
      <div>
        <div className="font-semibold mb-2">Advanced</div>
        <label className="block mb-1 text-sm">Visible
          <BindingEditor value={value.visible || ''} onChange={v => onChange({ ...value, visible: v })} />
          <span className="block text-xs text-gray-400">Show/hide based on JS expression (e.g. {'{{user.canUpload}}'})</span>
        </label>
        <label className="block mb-1 text-sm">Disabled
          <input type="checkbox" checked={!!value.disabled} onChange={e => onChange({ ...value, disabled: e.target.checked })} />
        </label>
      </div>
    </div>
  );
};
