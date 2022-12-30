import {
  Box,
  FormHelperText,
  OutlinedTextFieldProps,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Control, useController } from 'react-hook-form';

export interface MuiTextFieldProps extends OutlinedTextFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  title?: string;
  rounded?: boolean;
  horizontal?: boolean;
  labelWidth?: number;
}

export function MuiTextField(props: MuiTextFieldProps) {
  const {
    name,
    control,
    label,
    title,
    rounded,
    horizontal,
    labelWidth = 120,
    ...restProps
  } = props;

  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Box>
      <Stack
        direction={horizontal ? 'row' : 'column'}
        alignItems={restProps.multiline ? 'flex-start' : undefined}
      >
        {title && (
          <Typography
            variant="body2"
            fontWeight={500}
            sx={{
              flexShrink: 0,
              width: horizontal ? labelWidth : 'auto',
              mb: horizontal ? 0 : 0.5,
              mt: horizontal && restProps.multiline ? '8.5px' : 0,
            }}
          >
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

      <FormHelperText error={!!error} sx={{ ml: horizontal ? `${labelWidth}px` : 0 }}>
        {error?.message}
      </FormHelperText>
    </Box>
  );
}
