import React from 'react';

interface BindingEditorProps {
  value?: string;
  onChange: (v: string) => void;
}

const BindingEditor: React.FC<BindingEditorProps> = ({ value = '', onChange }) => {
  const [text, setText] = React.useState<string>(value);

  React.useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <div className="space-y-2">
      <input className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" value={text} onChange={(e) => setText(e.target.value)} placeholder='e.g. {{currentUser.name}}' />
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-gray-600 rounded" onClick={() => onChange(text)}>Apply</button>
        <button className="px-3 py-1 bg-gray-800 rounded" onClick={() => { setText(''); onChange(''); }}>Clear</button>
      </div>
    </div>
  );
};

export default BindingEditor;
