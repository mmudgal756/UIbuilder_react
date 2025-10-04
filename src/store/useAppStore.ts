import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ComponentData, ComponentType, ApiEndpoint, SqlQuery, Datasource, AppPage, GlobalState, CodeGeneration, AppSettings, Theme } from '../types';

const defaultTheme: Theme = {
  id: 'default',
  name: 'Default',
  colors: {
    primary: '#3B82F6',
    secondary: '#6B7280',
    accent: '#10B981',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    text: '#1F2937',
    textSecondary: '#6B7280'
  },
  fonts: {
    primary: 'Inter, sans-serif',
    secondary: 'JetBrains Mono, monospace'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  }
};

interface AppState {
  // UI State
  activeTab: 'canvas' | 'api' | 'sql' | 'datasources' | 'code';
  leftPanelTab: 'components' | 'pages' | 'queries' | 'apis' | 'layers';
  rightPanelTab: 'properties' | 'data' | 'logs' | 'settings';
  
  // Canvas State
  copiedComponent: ComponentData | null;
  selectedComponent: ComponentData | null;
  draggedComponent: ComponentType | null;
  canvasScale: number;
  gridSize: number;
  snapToGrid: boolean;
  
  // Pages
  pages: AppPage[];
  currentPageId: string;
  
  // API State
  apis: Record<string, ApiEndpoint>; // key: api.name
  selectedApi: ApiEndpoint | null;
  
  // SQL State
  sqlQueries: SqlQuery[];
  selectedQuery: SqlQuery | null;
  
  // Datasources
  datasources: Datasource[];
  selectedDatasource: Datasource | null;
  
  // Code Generation
  generatedCode: CodeGeneration;
  
  // Global State
  globalState: GlobalState;
  
  // App Settings
  settings: AppSettings;
  
  // Actions
  setActiveTab: (tab: 'canvas' | 'api' | 'sql' | 'datasources' | 'code') => void;
  setLeftPanelTab: (tab: 'components' | 'pages' | 'queries' | 'apis' | 'layers') => void;
  setRightPanelTab: (tab: 'properties' | 'data' | 'logs' | 'settings') => void;
  
  // Component Actions
  addComponent: (component: ComponentData) => void;
  copyComponent: (id: string) => void;
  cutComponent: (id: string) => void;
  pasteComponent: (x: number, y: number) => void;
  renameComponent: (id: string, newName: string) => void;
  resetComponentState: (id: string) => void;
  updateComponent: (id: string, updates: Partial<ComponentData>) => void;
  deleteComponent: (id: string) => void;
  duplicateComponent: (id: string) => void;
  selectComponent: (component: ComponentData | null) => void;
  setDraggedComponent: (component: ComponentType | null) => void;
  setCanvasScale: (scale: number) => void;
  moveComponent: (id: string, x: number, y: number) => void;
  resizeComponent: (id: string, width: number, height: number) => void;
  updateAppSettings: (updates: { gridSize?: number; snapToGrid?: boolean }) => void;
  
  // Page Actions
  addPage: (page: AppPage) => void;
  updatePage: (id: string, updates: Partial<AppPage>) => void;
  deletePage: (id: string) => void;
  duplicatePage: (id: string) => void;
  setCurrentPage: (id: string) => void;
  
  // API Actions
  addApi: (api: ApiEndpoint) => void;
  updateApi: (id: string, updates: Partial<ApiEndpoint>) => void;
  deleteApi: (id: string) => void;
  duplicateApi: (id: string) => void;
  selectApi: (api: ApiEndpoint | null) => void;
  runApi: (id: string) => Promise<void>;
  
  // SQL Actions
  addSqlQuery: (query: SqlQuery) => void;
  updateSqlQuery: (id: string, updates: Partial<SqlQuery>) => void;
  deleteSqlQuery: (id: string) => void;
  duplicateSqlQuery: (id: string) => void;
  selectSqlQuery: (query: SqlQuery | null) => void;
  runSqlQuery: (id: string) => Promise<void>;
  
  // Datasource Actions
  addDatasource: (datasource: Datasource) => void;
  updateDatasource: (id: string, updates: Partial<Datasource>) => void;
  deleteDatasource: (id: string) => void;
  selectDatasource: (datasource: Datasource | null) => void;
  testDatasourceConnection: (id: string) => Promise<boolean>;
  
  // Code Generation Actions
  generateCode: () => void;
  
  // Global State Actions
  updateGlobalState: (key: string, value: unknown) => void;
  
  // Settings Actions
  updateSettings: (updates: Partial<AppSettings>) => void;
  updateTheme: (theme: Theme) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // UI State
      activeTab: 'canvas',
      leftPanelTab: 'components',
      rightPanelTab: 'properties',
      
      // Canvas State
  // removed global components array
      copiedComponent: null,
      selectedComponent: null,
      draggedComponent: null,
      canvasScale: 1,
      gridSize: 20,
      snapToGrid: true,
      
      // Pages
      pages: [{
        id: 'page-1',
        name: 'Home',
  components: [],
        apis: [],
        queries: [],
        route: '/',
        isHomePage: true,
        seo: {
          title: 'Home Page',
          description: 'Welcome to our application'
        }
      }],
      currentPageId: 'page-1',
      
      // API State
  apis: {},
      selectedApi: null,
      
      // SQL State
      sqlQueries: [],
      selectedQuery: null,
      
      // Datasources
      datasources: [],
      selectedDatasource: null,
      
      // Code Generation
      generatedCode: {
        html: '',
        css: '',
        javascript: ''
      },
      
      // Global State
      globalState: {},
      
      // App Settings
      settings: {
        theme: defaultTheme,
        responsive: true,
        rtl: false,
        animations: true,
        debugMode: false,
        gridSize:100,
        snapToGrid: true,
        device: 'desktop',
        fontSize: 'small'
      },
      
      // Actions
      setActiveTab: (tab) => set({ activeTab: tab }),
      setLeftPanelTab: (tab) => set({ leftPanelTab: tab }),
      setRightPanelTab: (tab) => set({ rightPanelTab: tab }),
      
      // Component Actions
      addComponent: (component) =>
        set((state) => ({
          pages: state.pages.map(page =>
            page.id === state.currentPageId
              ? { ...page, components: [...page.components, component] }
              : page
          ),
        })),

      copyComponent: (id) =>
        set((state) => {
          const currentPage = state.pages.find(p => p.id === state.currentPageId);
          const comp = currentPage?.components.find(c => c.id === id) || null;
          return { copiedComponent: comp };
        }),

      cutComponent: (id) =>
        set((state) => {
          const currentPage = state.pages.find(p => p.id === state.currentPageId);
          const comp = currentPage?.components.find(c => c.id === id) || null;
          return {
            pages: state.pages.map(page =>
              page.id === state.currentPageId
                ? { ...page, components: page.components.filter(c => c.id !== id) }
                : page
            ),
            copiedComponent: comp,
            selectedComponent: state.selectedComponent?.id === id ? null : state.selectedComponent,
          };
        }),

      pasteComponent: (x, y) =>
        set((state) => {
          const copied = state.copiedComponent;
          if (!copied) return state;
          return {
            pages: state.pages.map(page =>
              page.id === state.currentPageId
                ? { ...page, components: [...page.components, { ...copied, id: `${copied.id}-paste-${Date.now()}`, x, y }] }
                : page
            ),
            copiedComponent: copied,
          };
        }),

      renameComponent: (id, newName) =>
        set((state) => {
          return {
            pages: state.pages.map(page =>
              page.id === state.currentPageId
                ? { ...page, components: page.components.map(comp => comp.id === id ? { ...comp, props: { ...(comp.props || {}), name: newName, label: newName } } : comp) }
                : page
            ),
            selectedComponent: state.selectedComponent?.id === id ? { ...state.selectedComponent, props: { ...(state.selectedComponent.props || {}), name: newName, label: newName } } : state.selectedComponent,
          };
        }),

      resetComponentState: (id) =>
        set((state) => {
          return {
            pages: state.pages.map(page =>
              page.id === state.currentPageId
                ? { ...page, components: page.components.map(comp => comp.id === id ? { ...comp, props: {}, style: {} } : comp) }
                : page
            ),
            selectedComponent: state.selectedComponent?.id === id ? { ...state.selectedComponent, props: {}, style: {} } : state.selectedComponent,
          };
        }),

      updateComponent: (id, updates) =>
        set((state) => {
          return {
            pages: state.pages.map(page =>
              page.id === state.currentPageId
                ? { ...page, components: page.components.map(comp => comp.id === id ? { ...comp, ...updates } : comp) }
                : page
            ),
            selectedComponent:
              state.selectedComponent?.id === id
                ? { ...state.selectedComponent, ...updates }
                : state.selectedComponent,
          };
        }),

      deleteComponent: (id) =>
        set((state) => {
          return {
            pages: state.pages.map(page =>
              page.id === state.currentPageId
                ? { ...page, components: page.components.filter(comp => comp.id !== id) }
                : page
            ),
            selectedComponent:
              state.selectedComponent?.id === id ? null : state.selectedComponent,
          };
        }),

      duplicateComponent: (id) =>
        set((state) => {
          const currentPage = state.pages.find(p => p.id === state.currentPageId);
          const component = currentPage?.components.find(c => c.id === id);
          if (!component) return state;
          const newComponent = {
            ...component,
            id: `${component.id}-copy-${Date.now()}`, x: component.x + 20, y: component.y + 20
          };
          return {
            pages: state.pages.map(page =>
              page.id === state.currentPageId
                ? { ...page, components: [...page.components, newComponent] }
                : page
            ),
          };
        }),

      selectComponent: (component) =>
        set({ selectedComponent: component }),

      setDraggedComponent: (component) =>
        set({ draggedComponent: component }),

      setCanvasScale: (scale) =>
        set({ canvasScale: scale }),

      updateAppSettings: (updates) =>
        set((state) => ({
          gridSize: updates.gridSize !== undefined ? updates.gridSize : state.gridSize,
          snapToGrid: updates.snapToGrid !== undefined ? updates.snapToGrid : state.snapToGrid,
        })),

      moveComponent: (id, x, y) =>
        set((state) => {
          return {
            pages: state.pages.map(page =>
              page.id === state.currentPageId
                ? { ...page, components: page.components.map(comp => comp.id === id ? { ...comp, x, y } : comp) }
                : page
            ),
          };
        }),

      resizeComponent: (id, width, height) =>
        set((state) => {
          return {
            pages: state.pages.map(page =>
              page.id === state.currentPageId
                ? { ...page, components: page.components.map(comp => comp.id === id ? { ...comp, width, height } : comp) }
                : page
            ),
          };
        }),
      
      // Page Actions
      addPage: (page) =>
        set((state) => ({
          pages: [...state.pages, { ...page, components: [] }],
          // Optionally, set currentPageId to the new page
          currentPageId: page.id,
          // Optionally, clear canvas components for new page
          components: [],
        })),
      
      updatePage: (id, updates) =>
        set((state) => ({
          pages: state.pages.map((page) =>
            page.id === id ? { ...page, ...updates } : page
          ),
        })),
      
      deletePage: (id) =>
        set((state) => ({
          pages: state.pages.filter((page) => page.id !== id),
          currentPageId: state.currentPageId === id ? state.pages[0]?.id || '' : state.currentPageId,
        })),

      duplicatePage: (id) =>
        set((state) => {
          const page = state.pages.find(p => p.id === id);
          if (!page) return state;
          
          const newPage = {
            ...page,
            id: `${page.id}-copy-${Date.now()}`, name: `${page.name} Copy`, route: `${page.route}-copy`, isHomePage: false
          };
          
          return {
            pages: [...state.pages, newPage]
          };
        }),
      
      setCurrentPage: (id) =>
        set((state) => {
          const page = state.pages.find(p => p.id === id);
          return {
            currentPageId: id,
            selectedComponent: null,
            // Optionally, clear copiedComponent when switching pages
            // copiedComponent: null,
          };
        }),
      
      // API Actions
      addApi: (api) =>
        set((state) => ({
          apis: { ...state.apis, [api.name]: api },
        })),
      
      updateApi: (id, updates) =>
        set((state) => {
          // Find by id, update by name
          const apiToUpdate = Object.values(state.apis).find(api => api.id === id);
          if (!apiToUpdate) return {};
          const updatedApi = { ...apiToUpdate, ...updates };
          return {
            apis: { ...state.apis, [updatedApi.name]: updatedApi },
            selectedApi:
              state.selectedApi?.id === id
                ? { ...state.selectedApi, ...updates }
                : state.selectedApi,
          };
        }),
      
      deleteApi: (id) =>
        set((state) => {
          const apiToDelete = Object.values(state.apis).find(api => api.id === id);
          if (!apiToDelete) return {};
          const { [apiToDelete.name]: _, ...rest } = state.apis;
          return {
            apis: rest,
            selectedApi: state.selectedApi?.id === id ? null : state.selectedApi,
          };
        }),

      duplicateApi: (id) =>
        set((state) => {
          const api = Object.values(state.apis).find(a => a.id === id);
          if (!api) return state;
          const newApi = {
            ...api,
            id: `${api.id}-copy-${Date.now()}`,
            name: `${api.name} Copy`
          };
          return {
            apis: { ...state.apis, [newApi.name]: newApi }
          };
        }),
      
      selectApi: (api) =>
        set({ selectedApi: api }),
      
      runApi: async (id) => {
        const state = get();
        const api = Object.values(state.apis).find(a => a.id === id);
        if (!api) return;
        
        set((state) => ({
          apis: Object.fromEntries(
            Object.values(state.apis)
              .map((a) => a.id === id ? { ...a, isLoading: true, error: undefined } : a)
              .map(a => [a.name, a])
          ),
        }));
        
        try {
          const headers = { ...api.headers };
          if (api.authentication?.type === 'bearer' && api.authentication.token) {
            headers['Authorization'] = `Bearer ${api.authentication.token}`;          } else if (api.authentication?.type === 'api-key' && api.authentication.apiKey) {
            headers[api.authentication.apiKeyHeader || 'X-API-Key'] = api.authentication.apiKey;    }
          
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), api.timeout || 30000);
          
          const response = await fetch(api.url, {
            method: api.method,
            headers,
            body: api.method !== 'GET' ? api.body : undefined,
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          const data = await response.json();
          
          set((state) => ({
            apis: Object.fromEntries(
              Object.values(state.apis)
                .map((a) => a.id === id ? { ...a, isLoading: false, response: data } : a)
                .map(a => [a.name, a])
            ),
          }));
        } catch (_error) {
          set((state) => ({
            apis: Object.fromEntries(
              Object.values(state.apis)
                .map((a) => a.id === id ? { ...a, isLoading: false, error: (_error as Error).message } : a)
                .map(a => [a.name, a])
            ),
          }));
        }
      },
      
      // SQL Actions
      addSqlQuery: (query) =>
        set((state) => ({
          sqlQueries: [...state.sqlQueries, query],
        })),
      
      updateSqlQuery: (id, updates) =>
        set((state) => ({
          sqlQueries: state.sqlQueries.map((query) =>
            query.id === id ? { ...query, ...updates } : query
          ),
          selectedQuery:
            state.selectedQuery?.id === id
              ? { ...state.selectedQuery, ...updates }
              : state.selectedQuery,
        })),
      
      deleteSqlQuery: (id) =>
        set((state) => ({
          sqlQueries: state.sqlQueries.filter((query) => query.id !== id),
          selectedQuery: state.selectedQuery?.id === id ? null : state.selectedQuery,
        })),

      duplicateSqlQuery: (id) =>
        set((state) => {
          const query = state.sqlQueries.find(q => q.id === id);
          if (!query) return state;
          
          const newQuery = {
            ...query,
            id: `${query.id}-copy-${Date.now()}`,     name: `${query.name} Copy`   };
          
          return {
            sqlQueries: [...state.sqlQueries, newQuery]
          };
        }),
      
      selectSqlQuery: (query) =>
        set({ selectedQuery: query }),
      
      runSqlQuery: async (id) => {
        const state = get();
        const query = state.sqlQueries.find(q => q.id === id);
        if (!query) return;
        
        set((state) => ({
          sqlQueries: state.sqlQueries.map((q) =>
            q.id === id ? { ...q, isLoading: true, error: undefined } : q
          ),
        }));
        
        try {
          // Simulate SQL query execution
          await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
          const mockResult = [
            { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', created_at: '2024-01-15' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', created_at: '2024-01-16' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', created_at: '2024-01-17' },
          ];
          
          set((state) => ({
            sqlQueries: state.sqlQueries.map((q) =>
              q.id === id ? { ...q, isLoading: false, result: mockResult } : q
            ),
          }));
        } catch (error) {
          set((state) => ({
            sqlQueries: state.sqlQueries.map((q) =>
              q.id === id ? { ...q, isLoading: false, error: (error as Error).message } : q
            ),
          }));
        }
      },
      
      // Datasource Actions
      addDatasource: (datasource) =>
        set((state) => ({
          datasources: [...state.datasources, datasource],
        })),
      
      updateDatasource: (id, updates) =>
        set((state) => ({
          datasources: state.datasources.map((ds) =>
            ds.id === id ? { ...ds, ...updates } : ds
          ),
          selectedDatasource:
            state.selectedDatasource?.id === id
              ? { ...state.selectedDatasource, ...updates }
              : state.selectedDatasource,
        })),
      
      deleteDatasource: (id) =>
        set((state) => ({
          datasources: state.datasources.filter((ds) => ds.id !== id),
          selectedDatasource: state.selectedDatasource?.id === id ? null : state.selectedDatasource,
        })),
      
      selectDatasource: (datasource) =>
        set({ selectedDatasource: datasource }),
      
      testDatasourceConnection: async (id) => {
        const state = get();
        const datasource = state.datasources.find(ds => ds.id === id);
        if (!datasource) return false;
        
        try {
          // Simulate connection test
          await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
          
          set((state) => ({
            datasources: state.datasources.map((ds) =>
              ds.id === id ? { ...ds, isConnected: true, lastTested: new Date() } : ds
            ),
          }));
          
          return true;
        } catch (error) {
          set((state) => ({
            datasources: state.datasources.map((ds) =>
              ds.id === id ? { ...ds, isConnected: false, lastTested: new Date() } : ds
            ),
          }));
          
          return false;
        }
      },
      
      // Code Generation Actions
      generateCode: () => {
        const state = get();
        const currentPage = state.pages.find(p => p.id === state.currentPageId);
        if (!currentPage) return;
        
        // Generate HTML
  const html = `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>${currentPage.seo?.title || currentPage.name}</title>\n    <meta name="description" content="${currentPage.seo?.description || ''}">\n    <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n    <div id="app">\n${currentPage.components.map(component => `        <div class="component component-${component.type}" style="position: absolute; left: ${component.x}px; top: ${component.y}px; width: ${component.width}px; height: ${component.height}px;">\n            ${generateComponentHTML(component)}\n        </div>`).join('\\n')}\n    </div>\n    <script src="script.js"></script>\n</body>\n</html>`;

        // Generate CSS
  const css = `/* Generated CSS */\n* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: ${state.settings.theme.fonts.primary};\n    background-color: ${state.settings.theme.colors.background};\n    color: ${state.settings.theme.colors.text};\n}\n\n#app {\n    position: relative;\n    min-height: 100vh;\n}\n\n.component {\n    position: absolute;\n}\n\n${currentPage.components.map(component => generateComponentCSS(component)).join('\\n')}`;      // Generate JavaScript
        const javascript = `// Generated JavaScript\nclass AppBuilder {\n    constructor() {\n        this.state = ${JSON.stringify(state.globalState, null, 4)};\n        this.init();\n    }\n    \n    init() {\n        this.bindEvents();\n        this.loadData();\n    }\n    \n    bindEvents() {\n        // Event bindings for components\n${currentPage.components.filter(c => c.events).map(component => 
    Object.entries(component.events || {}).map(([event, handler]) => 
        `        document.querySelector('[data-component-id="${component.id}"]')?.addEventListener('${event}', ${handler});`
    ).join('\\n')
).join('\\n')}\n    }\n    \n    async loadData() {\n        // API calls\n${state.apis.map((api:any) => `        // ${api.name}\n        try {\n            const response = await fetch('${api.url}', {\n                method: '${api.method}',\n                headers: ${JSON.stringify(api.headers, null, 16)}\n            });\n            const data = await response.json();\n            this.state.${api.name.toLowerCase().replace(/\\s+/g, '_')} = data;\n        } catch (error) {\n            console.error('Error loading ${api.name}:', error);\n        }`).join('\\n\\n')}\n    }\n    \n    updateComponent(id, data) {\n        const element = document.querySelector(\`[data-component-id="$\{id\}"]\`);\n        if (element) {\n            // Update component with new data\n            this.renderComponent(element, data);\n        }\n    }\n    \n    renderComponent(element, data) {\n        // Component rendering logic\n        element.innerHTML = JSON.stringify(data);\n    }\n}\n\n// Initialize the application\ndocument.addEventListener('DOMContentLoaded', () => {\n    new AppBuilder();\n});`;

        set({
          generatedCode: {
            html,
            css,
            javascript
          }
        });
      },
      
      // Global State Actions
      updateGlobalState: (key, value) =>
        set((state) => ({
          globalState: { ...state.globalState, [key]: value },
        })),
      
      // Settings Actions
      updateSettings: (updates) =>
        set((state) => ({
          settings: { ...state.settings, ...updates }        })),
      
      updateTheme: (theme) =>
        set((state) => ({
          settings: { ...state.settings, theme }       })),
    }),
    {
      name: 'app-builder-components', // name of the item in the storage (must be unique)
      // Store per-page components, current page name, and apis
      partialize: (state) => ({
        pages: state.pages.map(page => ({
          id: page.id,
          name: page.name,
          components: page.components,
        })),
        currentPageId: state.currentPageId,
        currentPageName: (state.pages.find(p => p.id === state.currentPageId)?.name) || '',
        apis: state.apis,
      }),
    }
  )
);

// Helper functions for code generation
function generateComponentHTML(component: ComponentData): string {
  switch (component.type) {
    case 'button':
      return `<button data-component-id="${component.id}">${component.props.text || 'Button'}</button>`;
    case 'input':
      return `<input data-component-id="${component.id}" type="${component.props.type || 'text'}" placeholder="${component.props.placeholder || ''}" />`;
    case 'text':
      return `<div data-component-id="${component.id}">${component.props.content || 'Text'}</div>`;
    case 'image':
      return `<img data-component-id="${component.id}" src="${component.props.src || ''}" alt="${component.props.alt || ''}" />`;
    default:
      return `<div data-component-id="${component.id}">Component</div>`;
  }
}

function generateComponentCSS(component: ComponentData): string {
  const styles = Object.entries(component.style)
    .map(([key, value]) => `    ${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
    .join('\\n');
  
  return `[data-component-id="${component.id}"] {\n${styles}\n}`;}
