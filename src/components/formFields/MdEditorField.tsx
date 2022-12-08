import { MdEditor, MdEditorChange } from '~/features/blog/components';
import { Control, useController } from 'react-hook-form';

export interface MdEditorFieldProps {
  name: string;
  control: Control<any>;
  placeholder?: string;
}

export function MdEditorField({ name, control, placeholder }: MdEditorFieldProps) {
  const {
    field: { value, onChange },
  } = useController({ name, control });

  const handleEditorChange = ({ html, text }: MdEditorChange) => {
    onChange(text);
  };

  return <MdEditor value={value} onEditorChange={handleEditorChange} placeholder={placeholder} />;
}
