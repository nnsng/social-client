import { Grid } from '@mui/material';
import { KeywordInput } from 'components/common';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface IKeywordInputFieldProps {
  name: string;
  control: Control<any>;
  max?: number;
  label?: string;
  placeholder?: string;
  errorText?: string;
}

export function KeywordInputField(props: IKeywordInputFieldProps) {
  const { name, control, ...keywordInputProps } = props;

  const {
    field: { value, onChange },
  } = useController({ name, control });

  return (
    <Grid item xs>
      <KeywordInput name={name} value={value} onChange={onChange} {...keywordInputProps} />
    </Grid>
  );
}
