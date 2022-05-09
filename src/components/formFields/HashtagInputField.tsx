import { Grid } from '@mui/material';
import { HashtagInput } from 'components/common';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface IHashtagInputFieldProps {
  name: string;
  control: Control<any>;
  max?: number;
  label?: string;
  placeholder?: string;
  errorText?: string;
}

export function HashtagInputField(props: IHashtagInputFieldProps) {
  const { name, control, ...hashtagInputProps } = props;

  const {
    field: { value, onChange },
  } = useController({ name, control });

  return (
    <Grid item xs>
      <HashtagInput name={name} value={value} onChange={onChange} {...hashtagInputProps} />
    </Grid>
  );
}
