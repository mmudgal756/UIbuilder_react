import React from 'react';
import { BaseProps, ValueOrBinding } from '../../../types/ui/shared';
import { ComponentData } from '../../../types/components';
import { useAppStore } from '../../../store/useAppStore';

export interface ButtonProps extends BaseProps {
  component: ComponentData;
  isPreview?: boolean;
  onClick?: () => void; // optional click handler passed by host/runtime
  text?: ValueOrBinding<string>;
  variant?: ValueOrBinding<'primary' | 'secondary' | 'ghost' | 'danger' | 'link' | string>;
  size?: ValueOrBinding<'xs' | 'sm' | 'md' | 'lg' | string>;
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
 * Map size -> padding/text classes
 */
const sizeClasses: Record<string, string> = {
  xs: 'text-xs px-2 py-1.5',
  sm: 'text-sm px-3 py-2',
  md: 'text-base px-4 py-3',
  lg: 'text-lg px-5 py-4',
};

export const Button: React.FC<ButtonProps> = ({ component, isPreview = false, onClick }) => {
  const setCurrentPage = useAppStore(state => state.setCurrentPage);
  // read props from component.props (fallbacks)
  const props = (component.props || {}) as Record<string, any>;

  // Dynamic style logic for variants
  const selectedColor = component.style?.backgroundColor;
  let style: React.CSSProperties = {};
  if (props.variant === 'primary') {
    style = {
      background: selectedColor,
      color: '#fff',
      border: `1px solid ${selectedColor}`,
    };
  } else if (props.variant === 'secondary') {
    style = {
      background: '#fff',
      color: selectedColor,
      border: `1px solid ${selectedColor}`,
    };
  } else if (props.variant === 'tertiary') {
    style = {
      background: '#fff',
      color: selectedColor,
      border: '1px solid #fff',
    };
  }
  const visibleProp = readValue<boolean>(props.visible);
  if (visibleProp === false) return null; // respect visibility

  const textProp = readValue<string>(props.label) ?? 'Button';
  //const variantProp = String(readValue<string>(props.variant) ?? 'primary');
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

    // If in preview mode and action is navigate, perform navigation
    if (isPreview && onClickAction && typeof onClickAction === 'object' && onClickAction.type === 'navigate') {
      const page = onClickAction.payload?.pageId;
      
      if (typeof page === 'string' && page.length > 0) {
        setCurrentPage(page);
        return;
      } else {
        window.alert('Navigate action: No page specified');
        return;
      }
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
    sClass,
    finalDisabled ? 'opacity-50 cursor-not-allowed' : '',
    (component.style && component.style.display === 'block') ? 'w-full' : '',
  ].filter(Boolean).join(' ').trim();

  return (
    <button
      style={{ ...baseStyle, ...style }}
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
