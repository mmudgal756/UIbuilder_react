import React from 'react';
import { ComponentData } from '../../types';

export interface FileUploadProps { component: ComponentData; isPreview?: boolean }

export const FileUpload: React.FC<FileUploadProps> = ({ component }) => {
  return (
    <div style={{ textAlign: 'center', padding: 12, border: '2px dashed #D1D5DB', borderRadius: 6, ...component.style }}>
      <input type="file" accept={component.props.accept} multiple={!!component.props.multiple} />
      <div className="text-sm text-gray-500">{component.props.instructions || 'Drop files or click to upload'}</div>
    </div>
  );
};
