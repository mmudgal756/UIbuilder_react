import React, { useRef, useEffect } from "react";
import { useDrag } from "react-dnd";
import { ComponentData } from "../../types";
import { useAppStore } from "../../store/useAppStore";
import { RenderComponent } from "./RenderComponent";

interface DraggableComponentProps {
  component: ComponentData;
  isSelected: boolean;
  onSelect: () => void;
}

export const DraggableComponent: React.FC<DraggableComponentProps> = ({
  component,
  isSelected,
  onSelect,
}) => {
  const { updateComponent, snapToGrid, gridSize } = useAppStore();
  const elementRef = useRef<HTMLDivElement>(null);

  const frame = useRef<number | null>(null);

  // --- DnD for moving whole component
  const [{ isDragging }, drag] = useDrag({
    type: "existing-component",
    item: { id: component.id, type: "existing-component" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    drag(elementRef);
  }, [drag]);

  // Smooth update helper
  const scheduleUpdate = (updates: Partial<ComponentData>) => {
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      updateComponent(component.id, updates);
    });
  };

  // --- Move
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();

    const startX = e.clientX;
    const startY = e.clientY;
    const startComponentX = component.x;
    const startComponentY = component.y;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newX = startComponentX + deltaX;
      let newY = startComponentY + deltaY;

      // Keep inside canvas
      newX = Math.max(0, newX);
      newY = Math.max(0, newY);

      scheduleUpdate({ x: newX, y: newY });
    };

    const handleMouseUp = (e: MouseEvent) => {
      let finalX = component.x;
      let finalY = component.y;

      if (snapToGrid) {
        finalX = Math.round(finalX / gridSize) * gridSize;
        finalY = Math.round(finalY / gridSize) * gridSize;
      }

      updateComponent(component.id, { x: finalX, y: finalY });

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // --- Resize
  const handleResizeMouseDown = (
    e: React.MouseEvent,
    direction: "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw"
  ) => {
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = component.width;
    const startHeight = component.height;
    const startLeft = component.x;
    const startTop = component.y;

    const MIN_SIZE = 20;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startLeft;
      let newY = startTop;

      if (direction.includes("e")) {
        newWidth = Math.max(MIN_SIZE, startWidth + deltaX);
      }
      if (direction.includes("s")) {
        newHeight = Math.max(MIN_SIZE, startHeight + deltaY);
      }
      if (direction.includes("w")) {
        newWidth = Math.max(MIN_SIZE, startWidth - deltaX);
        newX = startLeft + deltaX;
      }
      if (direction.includes("n")) {
        newHeight = Math.max(MIN_SIZE, startHeight - deltaY);
        newY = startTop + deltaY;
      }

      scheduleUpdate({
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      });
    };

    const onMouseUp = () => {
      let finalX = component.x;
      let finalY = component.y;
      let finalW = component.width;
      let finalH = component.height;

      if (snapToGrid) {
        finalX = Math.round(finalX / gridSize) * gridSize;
        finalY = Math.round(finalY / gridSize) * gridSize;
        finalW = Math.round(finalW / gridSize) * gridSize;
        finalH = Math.round(finalH / gridSize) * gridSize;
      }

      updateComponent(component.id, {
        x: finalX,
        y: finalY,
        width: finalW,
        height: finalH,
      });

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={elementRef}
      className={`absolute border-2 transition-all ${
        isSelected
          ? "border-blue-400 shadow-lg z-10"
          : "border-transparent hover:border-blue-300"
      } ${isDragging ? "opacity-50" : "cursor-move"}`}
      style={{
        left: component.x,
        top: component.y,
        width: component.width,
        height: component.height,
      }}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onContextMenu={(e) => {
      e.preventDefault();
      e.stopPropagation();

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

      // Approximate menu dimensions
      const menuWidth = 220;
      const menuHeight = 320;
      const margin = 6;

      let x = rect.right + margin;
      let y = rect.top;

      // Flip horizontally if overflowing right
      if (x + menuWidth > window.innerWidth) {
        x = rect.left - menuWidth - margin;
      }

      // Flip vertically if overflowing bottom
      if (y + menuHeight > window.innerHeight) {
        y = window.innerHeight - menuHeight - margin;
      }

      const menuEvent = new CustomEvent("open-component-context", {
        detail: { x, y, component },
      });
      window.dispatchEvent(menuEvent);
      }}

    >
      <RenderComponent component={component} />

      {/* Resize handles */}
      {isSelected && (
        <>
          {/* Corners */}
          <div
            className="absolute -top-1 -left-1 w-3 h-3 bg-blue-400 border border-white cursor-nw-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "nw")}
          />
          <div
            className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 border border-white cursor-ne-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "ne")}
          />
          <div
            className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-400 border border-white cursor-sw-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "sw")}
          />
          <div
            className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-400 border border-white cursor-se-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "se")}
          />

          {/* Sides */}
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-400 border border-white cursor-n-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "n")}
          />
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-400 border border-white cursor-s-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "s")}
          />
          <div
            className="absolute top-1/2 -left-1 -translate-y-1/2 w-3 h-3 bg-blue-400 border border-white cursor-w-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "w")}
          />
          <div
            className="absolute top-1/2 -right-1 -translate-y-1/2 w-3 h-3 bg-blue-400 border border-white cursor-e-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "e")}
          />
        </>
      )}
    </div>
  );
};
