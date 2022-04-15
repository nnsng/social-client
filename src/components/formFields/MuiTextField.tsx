import { OutlinedTextFieldProps, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface MuiTextFieldProps extends OutlinedTextFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  title?: string;
}

export function MuiTextField(props: MuiTextFieldProps) {
  const { name, control, label, title, ...restProps } = props;
  const { sx } = restProps;

  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <Stack direction="column">
      {title && (
        <Typography variant="h6" fontSize={18} fontWeight={500} mb={0.5}>
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
    </Stack>
  );
}
