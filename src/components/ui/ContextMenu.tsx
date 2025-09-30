import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Scissors,
  PlusSquare,
  Clipboard,
  Edit,
  RefreshCcw,
  Download,
  Shuffle,
  Eye,
  Trash2,
} from "lucide-react";
import { ComponentData, ComponentType } from "../../types";
import { useAppStore } from "../../store/useAppStore";

interface ContextMenuProps {
  x: number;
  y: number;
  component: ComponentData;
  onClose: () => void;
}

interface MenuAction {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  danger?: boolean;
  handler: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, component, onClose }) => {
  const {
    copyComponent,
    cutComponent,
    pasteComponent,
    duplicateComponent,
    deleteComponent,
    renameComponent,
    resetComponentState,
    updateComponent,
  } = useAppStore();

  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const actionsRef = useRef<MenuAction[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const actions: MenuAction[] = useMemo(
    () => [
      {
        label: "Copy",
        icon: Copy,
        handler: () => copyComponent(component.id),
      },
      {
        label: "Cut",
        icon: Scissors,
        handler: () => cutComponent(component.id),
      },
      {
        label: "Duplicate",
        icon: PlusSquare,
        handler: () => duplicateComponent(component.id),
      },
      {
        label: "Paste",
        icon: Clipboard,
        handler: () => pasteComponent(x + 20, y + 20),
      },
      {
        label: "Rename",
        icon: Edit,
        handler: () => {
          const currentName = (component.props?.name || component.props?.label) ?? "";
          const name = prompt("Rename component", currentName);
          if (name) renameComponent(component.id, name);
        },
      },
      {
        label: "Reset",
        icon: RefreshCcw,
        handler: () => {
          if (confirm("Reset component props and styles?")) resetComponentState(component.id);
        },
      },
      {
        label: "Export to module",
        icon: Download,
        handler: () => {
          const data = JSON.stringify(component, null, 2);
          const blob = new Blob([data], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${component.type}-${component.id}.json`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        },
      },
      {
        label: "Switch to...",
        icon: Shuffle,
        handler: () => {
          const newType = prompt("Switch component to type (e.g. button, input, text)", component.type);
          if (newType && newType !== component.type) {
            updateComponent(component.id, { type: newType as ComponentType });
          }
        },
      },
      {
        label: "View state",
        icon: Eye,
        handler: () => {
          const win = window.open("", "_blank", "noopener,noreferrer");
          if (win) {
            win.document.write("<pre>" + JSON.stringify(component, null, 2) + "</pre>");
            win.document.title = `Component ${component.id}`;
          } else {
            alert(JSON.stringify(component, null, 2));
          }
        },
      },
      {
        label: "Delete",
        icon: Trash2,
        danger: true,
        handler: () => deleteComponent(component.id),
      },
    ],
    [
      component, // ✅ include full object for ESLint
      copyComponent,
      cutComponent,
      pasteComponent,
      duplicateComponent,
      deleteComponent,
      renameComponent,
      resetComponentState,
      updateComponent,
      x,
      y,
    ]
  );

  useEffect(() => {
    actionsRef.current = actions;
  }, [actions]);

  useEffect(() => {
    setActiveIndex(0);
    const t = setTimeout(() => btnRefs.current[0]?.focus(), 0);
    return () => clearTimeout(t);
  }, [x, y, component.id]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const len = actionsRef.current.length;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = (prev + 1) % len;
          btnRefs.current[next]?.focus();
          return next;
        });
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = (prev - 1 + len) % len;
          btnRefs.current[next]?.focus();
          return next;
        });
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const action = actionsRef.current[activeIndex];
        if (action) {
          action.handler();
          onClose();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [activeIndex, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.95, y: -5 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -5 }}
        transition={{ duration: 0.12 }}
        style={{ position: "absolute", top: y, left: x, zIndex: 10000 }}
        role="dialog"
        aria-modal="true"
      >
        <div
          role="menu"
          aria-label={`${component.type || "Component"} context menu`}
          className="bg-white text-sm rounded-lg shadow-xl w-56 overflow-hidden border border-gray-200"
        >
          <div className="px-3 py-2 font-semibold border-b bg-gray-50 text-gray-700">
            {component.type || "Component"}
          </div>
          {actions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                ref={(el) => (btnRefs.current[idx] = el)}
                role="menuitem"
                tabIndex={-1}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => {
                  action.handler();
                  onClose();
                }}
                className={`flex items-center gap-3 w-full text-left px-3 py-2 text-gray-800 hover:bg-gray-100 ${
                  action.danger ? "text-red-600 font-medium" : ""
                } ${idx === activeIndex ? "bg-gray-100" : ""}`}
              >
                <Icon className="w-4 h-4" />
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContextMenu;
