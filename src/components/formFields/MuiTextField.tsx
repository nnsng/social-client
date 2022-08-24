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
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <Stack direction="column">
      {title && (
        <Typography fontSize={{ xs: 14, sm: 16 }} fontWeight={500} mb={0.5}>
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
        sx={{
          '& .MuiInputBase-root': {
            fontSize: { xs: 14, sm: 16 },
            borderRadius: !!rounded ? 40 : 'auto',
          },
          ...restProps.sx,
        }}
      />
    </Stack>
  );
}
