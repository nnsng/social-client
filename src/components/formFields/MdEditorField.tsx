import MdEditor, { IMdEditorChange } from 'features/blog/components/MdEditor';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface IMdEditorFieldProps {
  name: string;
  control: Control<any>;
  placeholder?: string;
}

export function MdEditorField({ name, control, placeholder }: IMdEditorFieldProps) {
  const {
    field: { value, onChange },
  } = useController({ name, control });

  const handleEditorChange = ({ html, text }: IMdEditorChange) => {
    onChange(text);
  };

  return <MdEditor value={value} onEditorChange={handleEditorChange} placeholder={placeholder} />;
}
