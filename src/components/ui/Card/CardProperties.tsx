import React from 'react';
import { CardProps } from '../../../types/ui/Card';
import { ApiAutocompleteInput } from '../ApiAutocompleteInput/ApiAutocompleteInput';

interface CardPropertiesPanelProps {
  value: CardProps;
  onChange: (value: CardProps) => void;
}

export const CardPropertiesPanel: React.FC<CardPropertiesPanelProps> = ({ value, onChange }) => {
    const handleSeriesDataChange = (newData: any) => {
      console.log("New Data:", newData,value);
      
    onChange({ ...value, subtitle: newData });
  };

  return (
   <div className="space-y-4 p-4 bg-white rounded-lg shadow">
  {/* Title */}
  <label className="block">
    <span className="block text-sm font-medium text-gray-700 mb-1">Title</span>
    <input
      type="text"
      value={value.title || ''}
      onChange={(e) => onChange({ ...value, title: e.target.value })}
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </label>

  {/* Subtitle */}
  <label className="block">
    <span className="block text-sm font-medium text-gray-700 mb-1">Subtitle</span>
    {/* <input
      type="text"
      value={value.subtitle || ''}
      onChange={(e) => onChange({ ...value, subtitle: e.target.value })}
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    /> */}


       <ApiAutocompleteInput
              value={value.subtitle}
              onChange={handleSeriesDataChange}
              rows={6}
              showHelperText={true}
            />
  </label>

  {/* Hoverable */}
  <label className="flex items-center space-x-2">
    <input
      type="checkbox"
      checked={value.hoverable}
      onChange={(e) => onChange({ ...value, hoverable: e.target.checked })}
      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
    <span className="text-sm text-gray-700">Hoverable</span>
  </label>

  {/* Outlined */}
  <label className="flex items-center space-x-2">
    <input
      type="checkbox"
      checked={value.outlined}
      onChange={(e) => onChange({ ...value, outlined: e.target.checked })}
      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
    <span className="text-sm text-gray-700">Outlined</span>
  </label>
</div>

  );
};
