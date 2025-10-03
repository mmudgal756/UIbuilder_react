import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { ComponentLibrary } from './ComponentLibrary';
import { PagesPanel } from './PagesPanel';
import { QueriesPanel } from './QueriesPanel';
import { ApisPanel } from './ApisPanel';
import { LayersPanel } from './LayersPanel';
import { 
  Layers, 
  FileText, 
  Database, 
  Globe,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const LeftPanel: React.FC = () => {
  const { leftPanelTab, setLeftPanelTab } = useAppStore();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const tabs = [
    { id: 'components', label: 'Components', icon: Layers, show: true },
    { id: 'pages', label: 'Pages', icon: FileText, show: true },
    { id: 'queries', label: 'Queries', icon: Database, show: true },
    { id: 'apis', label: 'APIs', icon: Globe, show: true },
    { id: 'layers', label: 'Layers', icon: Layers, show: true },
  ] as const;

  const visibleTabs = tabs.filter(tab => tab.show);

  if (isCollapsed) {
    return (
      <div className="w-12 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-2">
          <button
            onClick={() => setIsCollapsed(false)}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-col gap-1 p-2">
          {visibleTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setLeftPanelTab(tab.id);
                  setIsCollapsed(false);
                }}
                className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
                  leftPanelTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
                title={tab.label}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="h-12 border-b border-gray-700 flex items-center justify-between px-2">
        <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-800">
          {visibleTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setLeftPanelTab(tab.id)}
                className={`flex items-center gap-1 px-1.5 py-1 rounded text-xs font-medium transition-colors ${
                  leftPanelTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
                style={{ minWidth: 0 }}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {leftPanelTab === 'components' && <ComponentLibrary />}
        {leftPanelTab === 'pages' && <PagesPanel />}
        {leftPanelTab === 'layers' && <LayersPanel />}
        {leftPanelTab === 'queries' && <QueriesPanel />}
        {leftPanelTab === 'apis' && <ApisPanel />}
      </div>
    </div>
  );
};