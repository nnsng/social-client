import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
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

interface MuiTextFieldProps extends OutlinedTextFieldProps {
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
            justifyContent="space-between"
            sx={{
              width: '100%',
              mb: 0.5,
              fontWeight: 500,
            }}
          >
            <Typography variant="body2" component="span" fontWeight={500}>
              {label}
            </Typography>

            {error && (
              <Typography variant="body2" component="span" color="error" fontWeight={500}>
                {error.message}
              </Typography>
            )}

            {optional && !error && (
              <Typography variant="body2" component="span" color="text.secondary" fontWeight={400}>
                ({t('optional')})
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
              <IconButton edge="end" onClick={() => setShowPassword((x) => !x)}>
                {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
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
