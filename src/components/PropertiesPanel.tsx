import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Settings, Trash2, Copy } from 'lucide-react';
import propertyMeta, { PropMeta } from './propertyMeta';
import componentEditorMeta from './componentEditorMeta';
import ActionBuilder, { ActionDescriptor } from './ui/ActionBuilder';
import BindingEditor from './ui/BindingEditor';
// Import per-component property panels
import { ButtonPropertiesPanel } from './ui/Button/ButtonProperties';
import { TablePropertiesPanel } from './ui/Table/TableProperties';
import { FileUploadPropertiesPanel } from './ui/FileUpload/FileUploadProperties';
import { DatePickerPropertiesPanel } from './ui/DatePicker/DatePickerProperties';
import { InputPropertiesPanel } from './ui/Input/InputProperties';

/* ----------------- color utils ----------------- */
function expandShortHex(hex: string) {
  // "#abc" -> "#aabbcc"
  if (hex.length === 4) {
    return '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  return hex;
}

/**
 * Convert a CSS color (named color, rgb(), rgba(), #rgb, #rrggbb) to "#rrggbb".
 * If conversion fails, returns the provided fallback ('#ffffff' by default).
 */
function normalizeToHexColor(input?: string | null, fallback = '#ffffff'): string {
  if (!input) return fallback;
  try {
    const s = String(input).trim();
    if (!s) return fallback;

    // If already #rrggbb or #rgb form, normalize/expand
    if (s.startsWith('#')) {
      const hex = s.toLowerCase();
      if (hex.length === 7) return hex;
      if (hex.length === 4) return expandShortHex(hex);
      // unknown length, fallback
      return fallback;
    }

    // Use an offscreen canvas to normalize any valid CSS color name or rgb() etc
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext && canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = s;
      const norm = String(ctx.fillStyle).toLowerCase();

      if (norm.startsWith('#')) {
        if (norm.length === 7) return norm;
        if (norm.length === 4) return expandShortHex(norm);
      }

      // If ctx.fillStyle returned rgb(...) parse it
      const rgbMatch = norm.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
      if (rgbMatch) {
        const r = parseInt(rgbMatch[1], 10);
        const g = parseInt(rgbMatch[2], 10);
        const b = parseInt(rgbMatch[3], 10);
        const toHex = (n: number) => n.toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      }
    }
  } catch {
    // fallthrough to fallback
  }
  return fallback;
}
/* ----------------- end color utils ----------------- */

export const PropertiesPanel: React.FC = () => {
  const { selectedComponent, updateComponent, deleteComponent } = useAppStore();

  if (!selectedComponent) return null;

  // Helper: get nested value for keys like 'style.backgroundColor' or 'props.options[0]'
  const getValueAtKey = (key: string) => {
    const parts = key.split('.');
    if (parts[0] === 'style') {
      let cur: Record<string, unknown> | undefined = (selectedComponent.style || {});
      for (let i = 1; i < parts.length; i++) {
        if (!cur || typeof cur !== 'object') return undefined;
        cur = cur[parts[i]] as Record<string, unknown>;
        if (cur === undefined) return undefined;
      }
      return cur;
    }
    let cur: Record<string, unknown> | undefined = (selectedComponent.props || {});
    for (let i = 0; i < parts.length; i++) {
      if (!cur || typeof cur !== 'object') return undefined;
      cur = cur[parts[i]] as Record<string, unknown>;
      if (cur === undefined) return undefined;
    }
    return cur;
  };

  // generic nested setter for props/style keys like 'style.background.color' or 'options[0]'
  const handlePropChange = (key: string, value: unknown) => {
    // Check current value and skip if unchanged (prevents unnecessary updates / loops)
    try {
      const current = getValueAtKey(key);
      const curStr = JSON.stringify(current);
      const newStr = JSON.stringify(value);
      if (curStr === newStr) return;
    } catch {
      // if stringify fails, continue with update
    }

    const parts = key.split('.');
    if (parts[0] === 'style') {
      const style = { ...(selectedComponent.style || {}) } as Record<string, unknown>;
      let cur: Record<string, unknown> = style;
      for (let i = 1; i < parts.length - 1; i++) {
        const p = parts[i];
        if (!cur[p] || typeof cur[p] !== 'object') cur[p] = {};
        cur = cur[p] as Record<string, unknown>;
      }

      let finalValue = value;
      // Normalize color keys to hex to avoid <input type="color"> warnings
      const lastKey = parts[parts.length - 1];
      if (typeof finalValue === 'string' && /color|background|fill/i.test(lastKey)) {
        finalValue = normalizeToHexColor(finalValue, '#ffffff');
      }

      cur[parts[parts.length - 1]] = finalValue;
      updateComponent(selectedComponent.id, { style });
      return;
    }

    const props = { ...(selectedComponent.props || {}) } as Record<string, unknown>;
    let cur: Record<string, unknown> = props;
    for (let i = 0; i < parts.length - 1; i++) {
      const p = parts[i];
      if (!cur[p] || typeof cur[p] !== 'object') cur[p] = {};
      cur = cur[p] as Record<string, unknown>;
    }

    let finalValue: unknown = value;
    // If a prop name looks like a color, normalize it as well
    const lastKey = parts[parts.length - 1];
    if (typeof finalValue === 'string' && /color|background|fill/i.test(lastKey)) {
      finalValue = normalizeToHexColor(String(finalValue), '#ffffff');
    }

    cur[parts[parts.length - 1]] = finalValue;
    updateComponent(selectedComponent.id, { props });
  };

  const handleSizeChange = (dimension: 'width' | 'height', value: number) => {
    updateComponent(selectedComponent.id, { [dimension]: value });
  };

  const handlePositionChange = (axis: 'x' | 'y', value: number) => {
    updateComponent(selectedComponent.id, { [axis]: value });
  };

  const handleStyleChange = (key: string, value: unknown) => {
    // delegate to generic prop change handler for style.* keys
    handlePropChange(['style', key].join('.'), value);
  };

  const renderControl = (meta: PropMeta) => {
    const value = getValueAtKey(meta.key) as unknown;

    switch (meta.control) {
      case 'text': {
        const v = typeof value === 'string' ? value : value == null ? '' : String(value);
        return (
          <input
            type="text"
            value={v}
            onChange={(e) => handlePropChange(meta.key, e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
          />
        );
      }
      case 'number': {
        const n = typeof value === 'number' ? value : Number(value ?? 0);
        return (
          <input
            type="number"
            value={n}
            onChange={(e) => handlePropChange(meta.key, Number(e.target.value))}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
          />
        );
      }
      case 'textarea': {
        const v = typeof value === 'string' ? value : value == null ? '' : String(value);
        return (
          <textarea
            rows={4}
            value={v}
            onChange={(e) => handlePropChange(meta.key, e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
          />
        );
      }
      case 'select': {
        const v = typeof value === 'string' ? value : value == null ? '' : String(value);
        return (
          <select
            value={v}
            onChange={(e) => handlePropChange(meta.key, e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="">Select</option>
            {meta.options?.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        );
      }
      case 'checkbox': {
        const b = !!value;
        return <input type="checkbox" checked={b} onChange={(e) => handlePropChange(meta.key, e.target.checked)} />;
      }
      case 'color': {
        const raw = typeof value === 'string' ? value : String(value ?? '#ffffff');
        const hex = normalizeToHexColor(raw, '#ffffff');
        return (
          <input
            type="color"
            value={hex}
            onChange={(e) => handlePropChange(meta.key, e.target.value)}
            className="w-full h-8 rounded"
          />
        );
      }
      case 'json': {
        const v = (typeof value === 'string' && value.trim() !== '') ? value : (value ? JSON.stringify(value, null, 2) : '');
        return (
          <textarea
            rows={6}
            value={v}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                handlePropChange(meta.key, parsed);
              } catch {
                // store raw string until valid JSON
                handlePropChange(meta.key, e.target.value);
              }
            }}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white font-mono text-xs"
          />
        );
      }
      case 'action': {
        return <ActionBuilder value={value as ActionDescriptor | string} onChange={(v: ActionDescriptor | string) => handlePropChange(meta.key, v)} />;
      }
      case 'binding': {
        return <BindingEditor value={typeof value === 'string' ? value : ''} onChange={(v) => handlePropChange(meta.key, v)} />;
      }
      default:
        return null;
    }
  };

  // Render per-component property panel if available, else fallback to generic
  const renderPropsEditor = () => {
    const type = selectedComponent.type;
    // Map type to per-component panel
    if (type === 'button') {
      return <ButtonPropertiesPanel value={selectedComponent.props as import('./ui/Button/Button').ButtonProps} onChange={props => updateComponent(selectedComponent.id, { props })} />;
    }
    if (type === 'table') {
      return <TablePropertiesPanel value={selectedComponent.props as import('./ui/Table/Table').TableProps} onChange={props => updateComponent(selectedComponent.id, { props })} />;
    }
    if (type === 'fileupload') {
      return <FileUploadPropertiesPanel value={selectedComponent.props as import('./ui/FileUpload/FileUpload').FileUploadProps} onChange={props => updateComponent(selectedComponent.id, { props })} />;
    }
    if (type === 'datepicker') {
      return <DatePickerPropertiesPanel value={selectedComponent.props as import('./ui/DatePicker/DatePicker').DatePickerProps} onChange={props => updateComponent(selectedComponent.id, { props })} />;
    }
    if (type === 'input') {
      return <InputPropertiesPanel value={selectedComponent.props as import('./ui/Input/Input').InputProps} onChange={props => updateComponent(selectedComponent.id, { props })} />;
    }
    // Fallback: generic auto-form
    const metas = componentEditorMeta[type] || propertyMeta[type] || [];
    if (metas.length === 0) return <div className="text-gray-400">No properties available</div>;

    const sections: Record<string, PropMeta[]> = {};
    metas.forEach((m) => {
      const s = m.section || 'Content';
      sections[s] = sections[s] || [];
      sections[s].push(m);
    });

    return (
      <div className="space-y-4">
        {Object.keys(sections).map((section) => (
          <div key={section}>
            <div className="text-sm font-medium mb-2">{section}</div>
            <div className="space-y-3">
              {sections[section].map((meta) => (
                <div key={meta.key}>
                  <label className="block text-sm font-medium mb-1">{meta.label}</label>
                  {renderControl(meta)}
                  {meta.description ? <div className="text-xs text-gray-400 mt-1">{meta.description}</div> : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Properties
        </h3>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-gray-700 rounded">
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteComponent(selectedComponent.id)}
            className="p-1 hover:bg-red-600 rounded text-red-400"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Component Info */}
        <div className="bg-gray-750 p-3 rounded">
          <div className="text-sm text-gray-400 mb-1">Component Type</div>
          <div className="font-medium capitalize">{selectedComponent.type}</div>
        </div>

        {/* Position & Size */}
        <div className="bg-gray-750 p-3 rounded">
          <div className="text-sm font-medium mb-3">Layout</div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">X Position</label>
              <input
                type="number"
                value={selectedComponent.x}
                onChange={(e) => handlePositionChange('x', Number(e.target.value))}
                className="w-full p-2 text-sm bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Y Position</label>
              <input
                type="number"
                value={selectedComponent.y}
                onChange={(e) => handlePositionChange('y', Number(e.target.value))}
                className="w-full p-2 text-sm bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Width</label>
              <input
                type="number"
                value={selectedComponent.width}
                onChange={(e) => handleSizeChange('width', Number(e.target.value))}
                className="w-full p-2 text-sm bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Height</label>
              <input
                type="number"
                value={selectedComponent.height}
                onChange={(e) => handleSizeChange('height', Number(e.target.value))}
                className="w-full p-2 text-sm bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>
          </div>
        </div>

        {/* Properties */}
        <div className="bg-gray-750 p-3 rounded">
          <div className="text-sm font-medium mb-3">Properties</div>
          {renderPropsEditor()}
        </div>

        {/* Styling */}
        <div className="bg-gray-750 p-3 rounded">
          <div className="text-sm font-medium mb-3">Styling</div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Background Color</label>
              <input
                type="color"
                value={normalizeToHexColor(selectedComponent.style?.backgroundColor, '#ffffff')}
                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                className="w-full h-8 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Border Radius</label>
              <input
                type="text"
                value={selectedComponent.style?.borderRadius ?? '0px'}
                onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                placeholder="e.g., 6px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
