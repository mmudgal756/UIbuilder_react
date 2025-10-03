export type PropControl =
  | 'text'
  | 'number'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'color'
  | 'json';
  
  // special editor types
  export type SpecialPropControl = 'action' | 'binding';

  // merge into PropControlUnion used below via type alias
  export type PropControlUnion = PropControl | SpecialPropControl;

export interface PropMeta {
  key: string; // key in component.props or style.<key>
  label: string;
  control: PropControlUnion;
  section?: string; // Content, Styling, Data, Events, Advanced
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  description?: string;
}

export const propertyMeta: Record<string, PropMeta[]> = {
  button: [
    { key: 'text', label: 'Label', control: 'text', section: 'Content' },
    { key: 'variant', label: 'Variant', control: 'select', section: 'Content', options: [
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Ghost', value: 'ghost' },
      { label: 'Danger', value: 'danger' },
    ]},
    { key: 'onClickAction', label: 'onClick Action', control: 'text', section: 'Events', placeholder: 'e.g. runQuery:fetchUsers' },
    { key: 'tooltip', label: 'Tooltip', control: 'text', section: 'Advanced' },
    { key: 'style.background.color', label: 'Background Color', control: 'color', section: 'Styling' },
    { key: 'style.borderRadius', label: 'Border Radius', control: 'text', section: 'Styling' },
  ],

  input: [
    { key: 'placeholder', label: 'Placeholder', control: 'text', section: 'Content' },
    { key: 'type', label: 'Type', control: 'select', section: 'Content', options: [
      { label: 'Text', value: 'text' }, { label: 'Email', value: 'email' }, { label: 'Password', value: 'password' }, { label: 'Number', value: 'number' }
    ]},
    { key: 'defaultValue', label: 'Default Value', control: 'text', section: 'Content' },
    { key: 'debounce', label: 'Debounce (ms)', control: 'number', section: 'Advanced' },
    { key: 'validation', label: 'Validation (JSON)', control: 'json', section: 'Advanced', description: 'e.g. {"required":true}' },
    { key: 'style.borderRadius', label: 'Border Radius', control: 'text', section: 'Styling' },
  ],

  text: [
    { key: 'content', label: 'Content', control: 'textarea', section: 'Content' },
    { key: 'markdown', label: 'Markdown', control: 'checkbox', section: 'Content' },
    { key: 'style.typography.fontSize', label: 'Font Size', control: 'text', section: 'Styling' },
    { key: 'style.typography.fontWeight', label: 'Font Weight', control: 'text', section: 'Styling' },
  ],

  select: [
    { key: 'options', label: 'Options (JSON)', control: 'json', section: 'Content', description: 'Array of {label, value} objects' },
    { key: 'multiple', label: 'Multiple', control: 'checkbox', section: 'Content' },
    { key: 'searchable', label: 'Searchable', control: 'checkbox', section: 'Content' },
    { key: 'apiEndpoint', label: 'Data API Endpoint', control: 'text', section: 'Data' },
  ],
  image: [
    { key: 'src', label: 'Image URL', control: 'text', section: 'Content' },
    { key: 'alt', label: 'Alt Text', control: 'text', section: 'Content' },
    { key: 'style.width', label: 'Width', control: 'text', section: 'Styling' },
  ],
  table: [
    { key: 'columns', label: 'Columns (JSON)', control: 'json', section: 'Content', description: 'Array of column definitions' },
    { key: 'dataApi', label: 'Data API Endpoint', control: 'text', section: 'Data' },
    { key: 'pagination', label: 'Enable Pagination', control: 'checkbox', section: 'Data' },
  ],
  chart: [
    { key: 'chartType', label: 'Type', control: 'select', section: 'Content', options: [ { label: 'Line', value: 'line' }, { label: 'Bar', value: 'bar' }, { label: 'Pie', value: 'pie' } ] },
    { key: 'apiEndpoint', label: 'Series data', control: 'text', section: 'Data' },
  ],
  modal: [
    { key: 'title', label: 'Title', control: 'text', section: 'Content' },
    { key: 'size', label: 'Size', control: 'select', section: 'Advanced', options: [{label:'Small',value:'small'},{label:'Medium',value:'medium'},{label:'Large',value:'large'}] },
  ],
  tabs: [
    { key: 'tabs', label: 'Tabs (JSON)', control: 'json', section: 'Content' },
  ],
  fileupload: [
    { key: 'uploadEndpoint', label: 'Upload Endpoint', control: 'text', section: 'Data' },
    { key: 'multiple', label: 'Allow Multiple', control: 'checkbox', section: 'Content' },
  ],
  markdown: [
    { key: 'content', label: 'Content (markdown)', control: 'textarea', section: 'Content' },
    { key: 'allowHtml', label: 'Allow raw HTML', control: 'checkbox', section: 'Advanced' },
  ],
  map: [
    { key: 'provider', label: 'Provider', control: 'select', section: 'Content', options: [{label:'Leaflet',value:'leaflet'},{label:'Mapbox',value:'mapbox'}] },
    { key: 'center', label: 'Center (lng,lat)', control: 'text', section: 'Content' },
    { key: 'zoom', label: 'Zoom', control: 'number', section: 'Content' },
  ],
  calendar: [
    { key: 'events', label: 'Events (JSON)', control: 'json', section: 'Content' },
    { key: 'defaultView', label: 'Default View', control: 'select', section: 'Content', options: [{label:'Day',value:'day'},{label:'Week',value:'week'},{label:'Month',value:'month'}] },
  ],
  code: [
    { key: 'code', label: 'Code', control: 'textarea', section: 'Content' },
    { key: 'language', label: 'Language', control: 'text', section: 'Advanced' },
  ],
  badge: [
    { key: 'content', label: 'Content', control: 'text', section: 'Content' },
    { key: 'status', label: 'Status', control: 'select', section: 'Content', options: [{label:'Default',value:'default'},{label:'Success',value:'success'},{label:'Warning',value:'warning'},{label:'Error',value:'error'}] },
  ],
  avatar: [
    { key: 'src', label: 'Image URL', control: 'text', section: 'Content' },
    { key: 'size', label: 'Size', control: 'text', section: 'Styling' },
  ],
  alert: [
    { key: 'message', label: 'Message', control: 'text', section: 'Content' },
    { key: 'type', label: 'Type', control: 'select', section: 'Content', options: [{label:'Success',value:'success'},{label:'Info',value:'info'},{label:'Warning',value:'warning'},{label:'Error',value:'error'}] },
  ],
  divider: [
    { key: 'direction', label: 'Direction', control: 'select', section: 'Content', options: [{label:'Horizontal',value:'horizontal'},{label:'Vertical',value:'vertical'}] },
  ],
  breadcrumb: [
    { key: 'items', label: 'Items (JSON)', control: 'json', section: 'Content' },
  ],
  pagination: [
    { key: 'total', label: 'Total', control: 'number', section: 'Content' },
    { key: 'pageSize', label: 'Page Size', control: 'number', section: 'Content' },
  ],
  progress: [
    { key: 'value', label: 'Value', control: 'number', section: 'Content' },
  ],
  list: [
    { key: 'data', label: 'Data (JSON)', control: 'json', section: 'Content' },
  ],
  container: [
    { key: 'layout', label: 'Layout', control: 'select', section: 'Layout', options: [{label:'Stack',value:'stack'},{label:'Flex',value:'flex'},{label:'Grid',value:'grid'}] },
  ],
  card: [
    { key: 'title', label: 'Title', control: 'text', section: 'Content' },
    { key: 'subtitle', label: 'Subtitle', control: 'text', section: 'Content' },
  ],
  json: [
    { key: 'data', label: 'Data (JSON)', control: 'json', section: 'Content' },
  ],
  iframe: [
    { key: 'src', label: 'Source', control: 'text', section: 'Content' },
  ],
  video: [
    { key: 'src', label: 'Source', control: 'text', section: 'Content' },
  ],
  audio: [
    { key: 'src', label: 'Source', control: 'text', section: 'Content' },
  ],
  slider: [
    { key: 'min', label: 'Min', control: 'number', section: 'Content' },
    { key: 'max', label: 'Max', control: 'number', section: 'Content' },
  ],
  datepicker: [
    { key: 'format', label: 'Format', control: 'text', section: 'Content' },
  ],
  checkbox: [
    { key: 'label', label: 'Label', control: 'text', section: 'Content' },
    { key: 'checked', label: 'Checked', control: 'checkbox', section: 'Content' },
  ],
  radio: [
    { key: 'options', label: 'Options (JSON)', control: 'json', section: 'Content' },
  ],
  switch: [
    { key: 'checked', label: 'Checked', control: 'checkbox', section: 'Content' },
  ],
};

export default propertyMeta;
