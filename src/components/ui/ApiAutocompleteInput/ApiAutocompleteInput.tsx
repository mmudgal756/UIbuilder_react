import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../../store/useAppStore';

interface ApiAutocompleteInputProps {
  value: string | any;
  onChange: (value: any) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  showHelperText?: boolean;
}

export const ApiAutocompleteInput: React.FC<ApiAutocompleteInputProps> = ({
  value,
  onChange,
  placeholder = "Type / to see available APIs or enter {{apiName.response.map(item => ({ x: item.field, y: item.value }))}}",
  rows = 6,
  className = '',
  showHelperText = true
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredApis, setFilteredApis] = useState<string[]>([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Get APIs from the store
  const apis = useAppStore((state:any) => state.apis || {});
  const apiNames = Object.keys(apis);

  // Evaluate template expression
  const evaluateExpression = (expr: string): any => {
    try {
      const templateRegex = /\{\{(.+?)\}\}/g;
      const match = templateRegex.exec(expr);
      
      if (!match) {
        return JSON.parse(expr);
      }

      const expression = match[1].trim();
      
      // Create API store object for evaluation
      const apiStore: Record<string, any> = {};
      Object.keys(apis).forEach(apiName => {
        apiStore[apiName] = {
          response: apis[apiName].response || []
        };
      });
      
      // Create a function that evaluates the expression with API store in scope
      const evaluator = new Function(...Object.keys(apiStore), `return ${expression}`);
      
      // Pass API responses as arguments
      const apiResponses = Object.keys(apiStore).map(name => apiStore[name]);
      const result = evaluator(...apiResponses);
      
      return result;
    } catch (err) {
      // If evaluation fails, return the string as-is
      return expr;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setCursorPosition(e.target.selectionStart || 0);
    
    // Detect "/" and show dropdown
    const textBeforeCursor = newValue.substring(0, e.target.selectionStart || 0);
    const lastSlashIndex = textBeforeCursor.lastIndexOf('/');
    
    if (lastSlashIndex !== -1) {
      const searchTerm = textBeforeCursor.substring(lastSlashIndex + 1);
      
      // Filter API names based on search term
      const filtered = apiNames.filter(api => 
        api.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setFilteredApis(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setShowDropdown(false);
    }
    
    // Try to evaluate if it's a template expression, otherwise keep as string
    try {
      const evaluated = evaluateExpression(newValue);
      onChange(evaluated);
    } catch {
      onChange(newValue);
    }
  };

  // Handle API selection from dropdown
  const handleApiSelect = (apiName: string) => {
    if (!textareaRef.current) return;
    
    const currentValue = typeof value === 'string' 
      ? value 
      : JSON.stringify(value, null, 2);
    
    const textBeforeCursor = currentValue.substring(0, cursorPosition);
    const textAfterCursor = currentValue.substring(cursorPosition);
    const lastSlashIndex = textBeforeCursor.lastIndexOf('/');
    
    const beforeSlash = currentValue.substring(0, lastSlashIndex);
    const newValue = beforeSlash + `{{${apiName}.response}}` + textAfterCursor;
    
    // Update the value
    try {
      const evaluated = evaluateExpression(newValue);
      onChange(evaluated);
    } catch {
      onChange(newValue);
    }
    
    setShowDropdown(false);
    
    // Focus back on textarea
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          textareaRef.current && !textareaRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape' && showDropdown) {
      setShowDropdown(false);
      e.preventDefault();
    }
  };

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        rows={rows}
        value={
          typeof value === 'string'
            ? value
            : JSON.stringify(value, null, 2)
        }
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-green-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 ${className}`}
      />
      
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl max-h-64 overflow-y-auto"
        >
          {filteredApis.map((api) => (
            <div
              key={api}
              onClick={() => handleApiSelect(api)}
              className="px-4 py-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0 transition-colors"
            >
              <div className="font-medium text-teal-400">{api}</div>
              <div className="text-xs text-gray-400 mt-1">
                {`{{${api}.response}}`}
              </div>
              <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                <span>{apis[api].method || 'GET'}</span>
                <span>•</span>
                <span className={apis[api].isLoading ? 'text-yellow-400' : 'text-green-400'}>
                  {apis[api].isLoading ? 'Loading...' : 
                   apis[api].response ? `${Array.isArray(apis[api].response) ? apis[api].response.length : 1} items` : 'No data'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showHelperText && (
        <div className="text-xs text-gray-400 mt-2 space-y-1">
          <div className="text-teal-400">
            💡 Type <code className="bg-gray-700 px-1 rounded">/</code> to see available APIs
          </div>
          <div className="text-gray-500">
            Example: <code className="bg-gray-700 px-1 rounded text-green-400">
              {'{{posts.response.map(item => ({ x: item.userId, y: item.id }))}}'}
            </code>
          </div>
        </div>
      )}
      
      {apiNames.length > 0 && showHelperText && (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2">
          <div className="text-xs font-semibold text-gray-400 mb-2">Available APIs:</div>
          <div className="flex flex-wrap gap-2">
            {apiNames.map((api) => (
              <span
                key={api}
                className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-xs text-teal-400"
              >
                {api}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};