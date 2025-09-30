export interface ComponentData {
  id: string;
  type: ComponentType;
  x: number;
  y: number;
  width: number;
  height: number;
  props: Record<string, any>;
  style: Record<string, any>;
  bindings?: Record<string, string>;
  events?: Record<string, string>;
}

export interface ComponentDefinition {
  type: ComponentType;
  name: string;
  icon: string;
  defaultProps: Record<string, any>;
  defaultStyle: Record<string, any>;
  defaultSize: { width: number; height: number };
  category: ComponentCategory;
}

export type ComponentType = 
  | 'button'
  | 'input'
  | 'text'
  | 'image'
  | 'container'
  | 'table'
  | 'chart'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'form'
  | 'modal'
  | 'tabs'
  | 'list'
  | 'datepicker'
  | 'switch'
  | 'slider'
  | 'progress'
  | 'card'
  | 'divider'
  | 'badge'
  | 'avatar'
  | 'tooltip'
  | 'alert'
  | 'breadcrumb'
  | 'pagination'
  | 'rating'
  | 'timeline'
  | 'calendar'
  | 'fileupload'
  | 'video'
  | 'audio'
  | 'map'
  | 'iframe'
  | 'code'
  | 'json'
  | 'markdown';

export type ComponentCategory = 'basic' | 'form' | 'data' | 'layout' | 'media' | 'advanced';
