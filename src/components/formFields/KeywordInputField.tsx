import { Grid } from '@mui/material';
import { KeywordInput } from 'components/common';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface KeywordInputFieldProps {
  name: string;
  control: Control<any>;
  maxKeywords?: number;
  placeholder?: string;
  maxKeywordsError?: string;
}

export function KeywordInputField(props: KeywordInputFieldProps) {
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
