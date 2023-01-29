import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  IconButton,
  OutlinedTextFieldProps,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface MuiTextFieldProps extends OutlinedTextFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  optional?: boolean;
}

export function MuiTextField(props: MuiTextFieldProps) {
  const { name, control, label, optional, type = 'text', ...restProps } = props;

  const { t } = useTranslation('common');

  const [showPassword, setShowPassword] = useState(false);

  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Box>
      <Stack direction="column" alignItems={restProps.multiline ? 'flex-start' : undefined}>
        {label && (
          <Stack
            component={Typography}
            justifyContent="space-between"
            variant="body2"
            sx={{
              width: '100%',
              mb: 0.5,
              fontWeight: 500,
              color: 'text.primary',
            }}
          >
            <Typography variant="inherit" component="span">
              {label}
            </Typography>

            {optional && (
              <Typography variant="inherit" component="span" color="text.secondary">
                ({t('optional')})
              </Typography>
            )}

            {error && !optional && (
              <Typography variant="inherit" component="span" color="error">
                {error.message}
              </Typography>
            )}
          </Stack>
        )}

        <TextField
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={!!error}
          inputRef={ref}
          size="small"
          fullWidth
          spellCheck={false}
          type={type !== 'password' ? type : showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: type === 'password' && (
              <IconButton onClick={() => setShowPassword((x) => !x)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
          {...restProps}
          sx={{
            '.MuiInputBase-root': {
              fontSize: '0.875rem',
            },
            ...restProps.sx,
          }}
        />
      </Stack>
    </Box>
  );
}
