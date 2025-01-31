import { FileInputField } from '@/components/formFields';
import { CloudUploadRounded } from '@mui/icons-material';
import { Avatar, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { TFunction } from 'i18next';
import { useState } from 'react';
import { Control } from 'react-hook-form';

export interface AvatarFieldProps {
  name: string;
  control: Control<any>;
  avatarUrl?: string;
  loading?: boolean;
  setLoading?: (value: boolean) => void;
  onRemove?: () => void;
  t: TFunction;
}

const FILE_INPUT_ID = 'avatar-upload';

export function AvatarField(props: AvatarFieldProps) {
  const { name, control, avatarUrl = '', loading, setLoading, onRemove, t } = props;

  const [hover, setHover] = useState(false);

  return (
    <Stack key="avatar" direction="column">
      <Typography
        variant="body2"
        fontWeight={500}
        sx={{
          flexShrink: 0,
          mb: 0.5,
        }}
      >
        {t('label.avatar')}
      </Typography>

      <Stack alignItems="flex-end" spacing={2}>
        <Box position="relative">
          <Box
            sx={{
              width: { xs: 56, sm: 68 },
              height: { xs: 56, sm: 68 },
              position: 'relative',
              borderRadius: '50%',
              overflow: 'hidden',
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Avatar src={avatarUrl} sx={{ width: '100%', height: '100%' }} />

            {hover && (
              <Stack
                component="label"
                htmlFor={FILE_INPUT_ID}
                justifyContent="center"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  bgcolor: 'primary.main',
                  color: 'text.main',
                  cursor: 'pointer',
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <CloudUploadRounded fontSize="medium" color="inherit" />
                )}
              </Stack>
            )}
          </Box>
        </Box>

        {avatarUrl && (
          <Button
            variant="outlined"
            size="small"
            color="error"
            disabled={loading}
            onClick={onRemove}
          >
            {t('remove')}
          </Button>
        )}
      </Stack>

      <FileInputField
        name={name}
        control={control}
        id={FILE_INPUT_ID}
        disabled={loading}
        setUploading={setLoading}
      />
    </Stack>
  );
}
