import React from 'react';
import { ChartProps } from '../../../types/ui/Chart';
import { ApiAutocompleteInput } from '../ApiAutocompleteInput/ApiAutocompleteInput';

interface ChartPropertiesPanelProps {
  value: ChartProps;
  onChange: (value: ChartProps) => void;
}

export const ChartPropertiesPanel: React.FC<ChartPropertiesPanelProps> = ({ value, onChange }) => {
  const handleSeriesDataChange = (newData: any) => {
    onChange({ ...value, data: newData });
  };

  return (
    <div className="space-y-5 bg-gray-800 rounded-lg shadow-lg">
      {/* Title */}
      <label className="block">
        <span className="block mb-1 text-sm font-medium text-gray-300">Chart Title</span>
        <input
          type="text"
          value={value.title || ''}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </label>

      {/* X Axis */}
      <label className="block">
        <span className="block mb-1 text-sm font-medium text-gray-300">X Axis Label</span>
        <input
          type="text"
          value={value.xAxisLabel || ''}
          onChange={(e) => onChange({ ...value, xAxisLabel: e.target.value })}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </label>

      {/* Y Axis */}
      <label className="block">
        <span className="block mb-1 text-sm font-medium text-gray-300">Y Axis Label</span>
        <input
          type="text"
          value={value.yAxisLabel || ''}
          onChange={(e) => onChange({ ...value, yAxisLabel: e.target.value })}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </label>

      {/* Chart Type */}
      <div className="grid grid-cols-3 gap-4">
        <label className="block">
          <span className="block mb-1 text-sm font-medium text-gray-300">Chart Type</span>
          <select
            value={value.type}
            onChange={(e) =>
              onChange({ ...value, type: e.target.value as 'bar' | 'line' | 'pie' })
            }
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
          </select>
        </label>
      </div>

      {/* Series Data with API Autocomplete */}
      <label className="block">
        <span className="block mb-1 text-sm font-medium text-gray-300">Series Data (JSON)</span>
        <ApiAutocompleteInput
          value={value.data}
          onChange={handleSeriesDataChange}
          rows={6}
          showHelperText={true}
        />
        <div className="text-xs text-gray-400 mt-1">Array of {'{x, y}'} objects</div>
      </label>
    </div>
  );
};