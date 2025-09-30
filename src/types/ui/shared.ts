export type BindingExpression = { __binding: true; expression: string };

export type ValueOrBinding<T> = T | BindingExpression;

export interface Action {
  type: 'navigate' | 'runQuery' | 'openModal' | 'setState' | 'callApi' | 'custom';
  payload?: unknown;
}

export interface DataSourceRef {
  id: string;
  queryId?: string;
}

export interface TypographyProps {
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string | number;
  color?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
}

export type Spacing = string | { top?: string; right?: string; bottom?: string; left?: string };

export interface StyleProps {
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  margin?: Spacing;
  padding?: Spacing;
  display?: 'block' | 'inline-block' | 'flex' | 'grid' | 'inline';
  background?: { color?: string; imageUrl?: string; gradient?: string };
  border?: { width?: number; style?: string; color?: string };
  borderRadius?: number;
  boxShadow?: string;
  opacity?: number;
  position?: 'static' | 'relative' | 'absolute' | 'fixed';
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  typography?: TypographyProps;
  hover?: Partial<StyleProps>;
  active?: Partial<StyleProps>;
  focus?: Partial<StyleProps>;
  responsive?: { sm?: Partial<StyleProps>; md?: Partial<StyleProps>; lg?: Partial<StyleProps> };
}

export interface BaseProps {
  id: string;
  name?: string;
  visible?: ValueOrBinding<boolean>;
  disabled?: ValueOrBinding<boolean>;
  tooltip?: ValueOrBinding<string>;
  style?: StyleProps;
  layout?: Record<string, unknown>;
  dataSource?: DataSourceRef;
  bindings?: Record<string, BindingExpression>;
  events?: Record<string, Action[]>;
  access?: { rolesAllowed?: string[]; condition?: BindingExpression };
}
