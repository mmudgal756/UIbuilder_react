import React, { useRef, MutableRefObject } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { useAppStore } from '../store/useAppStore';
import { ComponentData, ComponentType } from '../types';
import { DraggableComponent } from './canvas/DraggableComponent';
import { nanoid } from 'nanoid';
import ContextMenu from './ui/ContextMenu';
import { useEffect, useState } from 'react';

export const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null) as MutableRefObject<HTMLDivElement | null>;
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; component: ComponentData } | null>(null);
  const {
    pages,
    currentPageId,
    addComponent,
    selectComponent,
    selectedComponent,
    canvasScale,
    snapToGrid,
    gridSize,
    updateComponent
  } = useAppStore();

  // Get components for the current page
  const components = pages.find(p => p.id === currentPageId)?.components || [];

  type DropItem = {
    id?: string;
    type: string;
    componentType?: string;
    definition?: {
      defaultSize: { width: number; height: number };
      defaultProps?: Record<string, unknown>;
      defaultStyle?: Record<string, unknown>;
    } | undefined;
  };

  const [{ isOver }, drop] = useDrop<DropItem, void, { isOver: boolean }>({
    accept: ['component', 'existing-component'],
    drop: (item: DropItem, monitor: DropTargetMonitor) => {
      const offset = monitor.getClientOffset();
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      
      if (offset && canvasRect) {
        let x = Math.max(0, (offset.x - canvasRect.left) / canvasScale - 60);
        let y = Math.max(0, (offset.y - canvasRect.top) / canvasScale - 20);
        
        if (snapToGrid) {
          x = Math.round(x / gridSize) * gridSize;
          y = Math.round(y / gridSize) * gridSize;
        }
        
        if (item.type === 'existing-component') {
          // Moving existing component
          if (item.id) updateComponent(item.id, { x, y });
        } else {
          // Adding new component
          if (!item.componentType || !item.definition) return;
          const newComponent: ComponentData = {
            id: nanoid(),
            type: item.componentType as ComponentType,
            x,
            y,
            width: item.definition.defaultSize.width,
            height: item.definition.defaultSize.height,
            props: { ...(item.definition.defaultProps || {}) },
            style: { ...(item.definition.defaultStyle || {}) }
          };
          
          addComponent(newComponent);
          selectComponent(newComponent);
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      selectComponent(null);
    }
    setContextMenu(null);
  };

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent;
      setContextMenu(ce.detail as { x: number; y: number; component: ComponentData });
    };
    window.addEventListener('open-component-context', handler as EventListener);
    return () => window.removeEventListener('open-component-context', handler as EventListener);
  }, []);

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Canvas Toolbar */}
      <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Canvas ({Math.round(canvasScale * 100)}%)
          </span>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{components.length} components</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Ready</span>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div
        ref={(node) => {
          canvasRef.current = node;
          drop(node);
        }}
        className={`flex-1 relative overflow-auto transition-all ${
          isOver ? 'bg-blue-50 border-2 border-dashed border-blue-300' : 'bg-white'
        }`}
        onClick={handleCanvasClick}
        style={{
          transform: `scale(${canvasScale})`,
          transformOrigin: 'top left',
          backgroundImage: snapToGrid ? `
            linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
          ` : 'none',
          backgroundSize: `${gridSize}px ${gridSize}px`,
          minHeight: '800px',
          minWidth: '1200px'
        }}
      >
        {components.map((component) => (
          <DraggableComponent
            key={component.id}
            component={component}
            isSelected={selectedComponent?.id === component.id}
            onSelect={() => selectComponent(component)}
          />
        ))}

        {/* Drop indicator */}
        {isOver && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="flex items-center justify-center h-full text-blue-500 text-lg font-medium">
              Drop component here
            </div>
          </div>
        )}

        {/* Empty state */}
        {components.length === 0 && !isOver && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Start Building</h3>
              <p className="text-sm">Drag components from the library to get started</p>
            </div>
          </div>
        )}
        {contextMenu && (
          <ContextMenu x={contextMenu.x} y={contextMenu.y} component={contextMenu.component} onClose={() => setContextMenu(null)} />
        )}
      </div>
    </div>
  );
};