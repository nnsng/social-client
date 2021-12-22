import { InputBase, InputBaseProps } from '@mui/material';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputBaseProps {
  name: string;
  control: Control<any>;
}

export function InputField({ name, control, ...restProps }: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid },
  } = useController({ name, control });

  return (
    <InputBase
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      fullWidth
      {...restProps}
    />
  );
}
