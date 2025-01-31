import { getImageUrlFromCDN } from '@/utils/common';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface FileInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  setUploading?: (value: boolean) => void;
}

export function FileInputField(props: FileInputFieldProps) {
  const { name, control, setUploading, ...inputProps } = props;

  const {
    field: { onChange },
  } = useController({ name, control });

  const handleFileInputChange = async (e: any) => {
    setUploading?.(true);

    try {
      const image = e.target.files[0];
      const imageUrl = await getImageUrlFromCDN(image);
      onChange(imageUrl);
    } catch (error) {}

    setUploading?.(false);
  };

  return (
    <input type="file" accept="image/*" onChange={handleFileInputChange} hidden {...inputProps} />
  );
}
