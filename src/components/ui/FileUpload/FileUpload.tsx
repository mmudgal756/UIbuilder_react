import React from 'react';
import './FileUpload.css';

export interface FileUploadProps {
  onChange?: (files: FileList | null) => void;
  label?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  label = 'Choose File',
  accept,
  multiple = false,
  disabled = false
}) => {
  return (
    <label className="custom-fileupload">
      <input
        type="file"
        onChange={e => onChange?.(e.target.files)}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
      />
      <span className="fileupload-label">{label}</span>
    </label>
  );
};
