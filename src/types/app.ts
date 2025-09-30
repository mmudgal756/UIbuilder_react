import { ComponentData } from './components';

export interface AppPage {
  id: string;
  name: string;
  components: ComponentData[];
  apis: string[];
  queries: string[];
  route?: string;
  isHomePage?: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface GlobalState {
  [key: string]: any;
}

export interface CodeGeneration {
  html: string;
  css: string;
  javascript: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export interface AppSettings {
  theme: Theme;
  responsive: boolean;
  rtl: boolean;
  animations: boolean;
  debugMode: boolean;

  // 👇 added missing fields
  gridSize: number;
  snapToGrid: boolean;
  device: "desktop" | "tablet" | "mobile";
  fontSize: "small" | "medium" | "large";
}
