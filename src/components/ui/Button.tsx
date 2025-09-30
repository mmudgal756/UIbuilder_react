import React from 'react';
import { ComponentData } from '../../types';
import { BaseProps, ValueOrBinding } from '../../types/ui/shared';

export interface ButtonProps extends BaseProps {
  component: ComponentData;
  isPreview?: boolean;
  onClick?: () => void; // optional click handler passed by host/runtime
  text?: ValueOrBinding<string>;
  variant?: ValueOrBinding<'primary'|'secondary'|'ghost'|'danger'|'link'|string>;
  size?: ValueOrBinding<'xs'|'sm'|'md'|'lg'|string>;
}

/**
 * Helper: read a ValueOrBinding-like field safely.
 * If value is a string return it, else try .value, else stringify fallback.
 */
function readValue<T = any>(v?: ValueOrBinding<T> | T): T | undefined {
  if (v === undefined || v === null) return undefined;
  // primitive value
  if (typeof v !== 'object') return v as unknown as T;
  // attempt to read common shape { value: ... } or binding string
  // (adjust depending on your ValueOrBinding shape)
  if ('value' in (v as any)) return (v as any).value as T;
  if ('binding' in (v as any)) return (v as any).binding as unknown as T;
  return v as unknown as T;
}

/**
 * Map variant -> classes (tailwind-like; adjust to your CSS)
 */
const variantClasses: Record<string, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-500',
  secondary: 'bg-gray-600 text-white hover:bg-gray-500',
  ghost: 'bg-transparent text-gray-200 hover:bg-gray-800',
  danger: 'bg-red-600 text-white hover:bg-red-500',
  link: 'bg-transparent text-blue-500 underline hover:opacity-80',
};

/**
 * Map size -> padding/text classes
 */
const sizeClasses: Record<string, string> = {
  xs: 'text-xs px-2 py-1',
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-5 py-3',
};

export const Button: React.FC<ButtonProps> = ({ component, isPreview = false, onClick }) => {
  // read props from component.props (fallbacks)
  const props = (component.props || {}) as Record<string, any>;

  const visibleProp = readValue<boolean>(props.visible);
  if (visibleProp === false) return null; // respect visibility

  const textProp = readValue<string>(props.text) ?? 'Button';
  const variantProp = String(readValue<string>(props.variant) ?? 'primary');
  const sizeProp = String(readValue<string>(props.size) ?? 'md');
  const disabledProp = readValue<boolean>(props.disabled) ?? false;
  const loadingProp = readValue<boolean>(props.loading) ?? false;
  const ariaLabelProp = readValue<string>(props.ariaLabel);
  const tooltipProp = readValue<string>(props.tooltip);
  const onClickAction = props.onClickAction; // action descriptor (object or string)

  // Compose style: base + component.style (component.style wins)
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    cursor: 'pointer',
    userSelect: 'none',
    border: 'none',
    ...component.style, // user-defined style should override defaults
  };

  // Determine classes based on variant/size
  const vClass = variantClasses[variantProp] || variantProp || '';
  const sClass = sizeClasses[sizeProp] || '';

  // final disabled state: if explicitly disabled OR in non-preview and not enabled for editing
  // (makes button clickable only when isPreview true unless explicitly allowed)
  const finalDisabled = Boolean(disabledProp) || (!isPreview && props.disableInDesigner !== false) || Boolean(loadingProp);

  // click handler: prefer onClick prop; otherwise dispatch a CustomEvent with the action descriptor.
  const handleClick = (e: React.MouseEvent) => {
    if (finalDisabled) {
      e.preventDefault();
      return;
    }

    // call runtime handler if provided (most tests / preview harnesses will pass this)
    if (typeof onClick === 'function') {
      try { onClick(); } catch (err) { /* swallow */ }
      return;
    }

    // fallback: if an action descriptor is present, emit an event so the app can pick it up.
    if (onClickAction) {
      const detail = {
        action: onClickAction,
        componentId: component.id,
        srcEvent: e.nativeEvent,
      };
      window.dispatchEvent(new CustomEvent('component:action', { detail }));
      return;
    }

    // nothing to do — no-op
  };

  // Simple spinner for loading
  const Spinner = () => (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" />
      <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );

  // Build className string (you can adapt to your project's CSS)
  const className = [
    'transition-all',
    'flex',
    'items-center',
    'justify-center',
    vClass,
    sClass,
    finalDisabled ? 'opacity-50 cursor-not-allowed' : '',
    (component.style && component.style.display === 'block') ? 'w-full' : '',
  ].filter(Boolean).join(' ').trim();

  return (
    <button
      style={baseStyle}
      className={className}
      disabled={finalDisabled}
      onClick={handleClick}
      aria-label={ariaLabelProp}
      title={tooltipProp}
      // allow keyboard activation when not disabled
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !finalDisabled) {
          e.preventDefault();
          handleClick(e as any);
        }
      }}
    >
      {loadingProp ? (
        <span className="inline-flex items-center gap-2">
          <Spinner />
          <span>{props.loadingText ?? 'Loading...'}</span>
        </span>
      ) : (
        <span>{textProp}</span>
      )}
    </button>
  );
};

export default Button;
