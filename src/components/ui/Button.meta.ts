import { PropMeta } from '../propertyMeta';

const buttonMeta: PropMeta[] = [
  // Content
  { key: 'text', label: 'Label', control: 'text', section: 'Content', description: 'Button text' },
  { key: 'variant', label: 'Variant', control: 'select', section: 'Content', options: [
    { label: 'Primary', value: 'primary' },
    { label: 'Secondary', value: 'secondary' },
    { label: 'Ghost', value: 'ghost' },
    { label: 'Danger', value: 'danger' },
    { label: 'Link', value: 'link' },
  ] },
  { key: 'size', label: 'Size', control: 'select', section: 'Content', options: [
    { label: 'Extra Small', value: 'xs' },
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
  ] },

  // Behavior
  { key: 'onClickAction', label: 'On Click', control: 'action', section: 'Events', placeholder: 'e.g. runQuery:fetchUsers' },
  { key: 'disabled', label: 'Disabled', control: 'checkbox', section: 'Behavior', description: 'Disable button interaction' },
  { key: 'loading', label: 'Loading State', control: 'checkbox', section: 'Behavior', description: 'Show as loading/spinner' },

  // Advanced (dynamic bindings)
  { key: 'visible', label: 'Visible', control: 'binding', section: 'Advanced', description: 'Show/hide based on condition (e.g. {{query.data.length > 0}})' },
  { key: 'tooltip', label: 'Tooltip', control: 'text', section: 'Advanced' },
  { key: 'ariaLabel', label: 'ARIA Label', control: 'text', section: 'Accessibility', description: 'Accessibility label for screen readers' },

  // Styling
  { key: 'style.backgroundColor', label: 'Background Color', control: 'color', section: 'Styling' },
  { key: 'style.color', label: 'Text Color', control: 'color', section: 'Styling' },
  { key: 'style.borderRadius', label: 'Border Radius', control: 'text', section: 'Styling', placeholder: 'e.g. 6px' },
  { key: 'style.padding', label: 'Padding', control: 'text', section: 'Styling', placeholder: 'e.g. 8px 16px' },
  { key: 'style.margin', label: 'Margin', control: 'text', section: 'Styling', placeholder: 'e.g. 4px' },
  { key: 'style.boxShadow', label: 'Shadow', control: 'text', section: 'Styling', placeholder: 'e.g. 0px 2px 4px rgba(0,0,0,0.2)' },
  { key: 'style.customClass', label: 'Custom CSS Class', control: 'text', section: 'Styling', description: 'Tailwind/CSS class overrides' },

  // Data / Debugging
  { key: 'id', label: 'Component ID', control: 'text', section: 'Debug', description: 'Unique component identifier' },
  { key: 'testId', label: 'Test ID', control: 'text', section: 'Debug', description: 'For automated testing (e.g. data-testid)' },
];

export default buttonMeta;
