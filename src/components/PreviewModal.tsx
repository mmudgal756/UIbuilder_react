import React, { useState } from 'react';
import { X, Monitor, Tablet, Smartphone, Maximize2, RefreshCw } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { RenderComponent } from './RenderComponent';

interface PreviewModalProps {
  onClose: () => void;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

const DEVICE_SIZES = {
  desktop: { width: '100%', height: '100%', icon: Monitor },
  tablet: { width: '768px', height: '1024px', icon: Tablet },
  mobile: { width: '375px', height: '667px', icon: Smartphone },
};

export const PreviewModal: React.FC<PreviewModalProps> = ({ onClose }) => {
  const { pages, currentPageId } = useAppStore();
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [selectedPageId, setSelectedPageId] = useState(currentPageId);

  const selectedPage = pages.find(p => p.id === selectedPageId);
  const displayComponents = selectedPage?.components || [];

  const handleRefresh = () => {
    setSelectedPageId(selectedPageId);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const deviceConfig = DEVICE_SIZES[device];
  const DeviceIcon = deviceConfig.icon;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`bg-white rounded-xl shadow-2xl flex flex-col transition-all ${
        isFullscreen ? 'w-full h-full' : 'w-[95%] h-[95%] max-w-7xl'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Device Selector */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              {(['desktop', 'tablet', 'mobile'] as DeviceType[]).map((deviceType) => {
                const Icon = DEVICE_SIZES[deviceType].icon;
                return (
                  <button
                    key={deviceType}
                    onClick={() => setDevice(deviceType)}
                    className={`p-2 rounded-md transition-all ${
                      device === deviceType
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    title={deviceType.charAt(0).toUpperCase() + deviceType.slice(1)}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={handleRefresh}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4 text-gray-600" />
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Toggle Fullscreen"
              >
                <Maximize2 className="w-4 h-4 text-gray-600" />
              </button>

              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              
              <button
                onClick={onClose}
                className="p-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Page Tabs */}
        <div className="border-b border-gray-200 bg-white px-6 overflow-x-auto">
          <div className="flex gap-1">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setSelectedPageId(page.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  selectedPageId === page.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {page.name}
                <span className="ml-2 text-xs text-gray-400">
                  ({page.components?.length || 0})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-gray-100 p-4 overflow-auto">
          <div 
            className="bg-white rounded-lg shadow-lg mx-auto overflow-auto transition-all"
            style={{ 
              width: deviceConfig.width, 
              height: deviceConfig.height,
              maxHeight: '100%',
            }}
          >
            {/* Device Frame Info Bar */}
            {device !== 'desktop' && (
              <div className="bg-gray-800 text-white text-xs py-1 px-3 flex items-center justify-between">
                <span>{deviceConfig.width}</span>
                <DeviceIcon className="w-3 h-3" />
              </div>
            )}

            {/* Canvas Content */}
            <div className="relative bg-white h-full overflow-auto">
              {displayComponents.map((component) => (
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
              
              {displayComponents.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <Monitor className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-lg font-medium text-gray-500">No components to preview</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Add components to your canvas to see them here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span>Page: <strong className="text-gray-700">{selectedPage?.name}</strong></span>
            <span>Components: <strong className="text-gray-700">{displayComponents.length}</strong></span>
            <span>Device: <strong className="text-gray-700">{device}</strong></span>
          </div>
          <div className="text-gray-400">
            Press <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Esc</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
};