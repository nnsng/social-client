import { OutlinedTextFieldProps, Stack, TextField, Typography } from '@mui/material';
import { Control, useController } from 'react-hook-form';

export interface MuiTextFieldProps extends OutlinedTextFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  title?: string;
  rounded?: boolean;
}

export function MuiTextField(props: MuiTextFieldProps) {
  const { name, control, label, title, rounded, ...restProps } = props;

  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Stack direction="column">
      {title && (
        <Typography variant="body2" fontWeight={500} mb={0.5}>
          {title}
        </Typography>
      )}

      <TextField
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        helperText={error?.message}
        inputRef={ref}
        size="small"
        fullWidth
        spellCheck={false}
        {...restProps}
        sx={{
          '& .MuiInputBase-root': {
            fontSize: '0.875rem',
            borderRadius: !!rounded ? 40 : 'auto',
          },
          ...restProps.sx,
        }}
      />
    </Stack>
  );
}
