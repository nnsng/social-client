import { Grid, OutlinedTextFieldProps, TextField, Typography } from '@mui/material';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface MuiTextFieldProps extends OutlinedTextFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  title?: string;
  half?: boolean;
}

export function MuiTextField(props: MuiTextFieldProps) {
  const { name, control, label, title, half, ...restProps } = props;
  const { sx } = restProps;

  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <Grid item xs={half ? 6 : 12}>
      {title && (
        <Typography variant="subtitle1" mb={0.5}>
          {title}
        </Typography>
      )}

      <TextField
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={invalid}
        helperText={error?.message}
        inputRef={ref}
        size="small"
        fullWidth
        spellCheck={false}
        {...restProps}
        sx={{ ...sx, bgcolor: 'background.paper' }}
      />
    </Grid>
  );
}
