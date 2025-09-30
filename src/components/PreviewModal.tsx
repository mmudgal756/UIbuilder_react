import React from 'react';
import { X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { RenderComponent } from './RenderComponent';

interface PreviewModalProps {
  onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ onClose }) => {
  const { pages, currentPageId } = useAppStore();
  const currentPage = pages.find(p => p.id === currentPageId);
  const components = currentPage?.components || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full h-full max-w-6xl max-h-4xl overflow-hidden">
        <div className="bg-gray-100 border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
            {currentPage && (
              <span className="text-sm text-gray-600">Page: {currentPage.name}</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="relative bg-white h-full overflow-auto">
          {components.map((component) => (
            <div
              key={component.id}
              className="absolute"
              style={{
                left: component.x,
                top: component.y,
                width: component.width,
                height: component.height,
              }}
            >
              <RenderComponent component={component} isPreview={true} />
            </div>
          ))}
          
          {components.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-500">
              No components to preview. Add some components to your canvas first.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};