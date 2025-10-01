
import { useAppStore } from '../store/useAppStore';
import { Trash2 } from 'lucide-react';

interface ComponentListSidebarProps {
  pageId: string;
}

export const ComponentListSidebar: React.FC<ComponentListSidebarProps> = ({ pageId }) => {
  const { pages, deleteComponent } = useAppStore();
  const page = pages.find((p:any) => p.id === pageId);
  if (!page) return null;

  return (
    <aside className="bg-white border border-gray-200 p-2 rounded mb-2">
      <h2 className="text-xs font-semibold mb-2 text-gray-500 uppercase tracking-wide">Components</h2>
      <ul className="space-y-1">
        {page.components.length === 0 && (
          <li className="text-gray-400 italic text-xs">No components dropped yet.</li>
        )}
        {page.components.map((comp:any) => (
          <li key={comp.id} className="flex items-center justify-between group hover:bg-gray-50 rounded px-2 py-1 transition">
            <span className="truncate font-medium text-gray-800 text-xs">
              {comp.props?.name || comp.props?.label || comp.type}
            </span>
            <button
              className="ml-2 text-red-500 opacity-70 hover:opacity-100 hover:text-red-700 rounded transition p-1"
              title="Delete component"
              onClick={() => deleteComponent(comp.id)}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ComponentListSidebar;
