import { Avatar, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FileInputField } from '~/components/formFields';

export interface AvatarFieldProps {
  control: Control<any>;
  avatarUrl?: string;
  loading?: boolean;
  setLoading?: (value: boolean) => void;
  onRemove?: () => void;
}

export function AvatarField(props: AvatarFieldProps) {
  const { control, avatarUrl = '', loading, setLoading, onRemove } = props;

  const { t } = useTranslation('editProfileForm');

  const FILE_INPUT_ID = 'avatar-upload';

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
          <Avatar
            src={avatarUrl}
            sx={{
              width: { xs: 56, sm: 68 },
              height: { xs: 56, sm: 68 },
            }}
          />

          {loading && (
            <Stack
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                inset: '0',
                bgcolor: 'action.disabled',
                borderRadius: '50%',
              }}
            >
              <CircularProgress size={24} />
            </Stack>
          )}
        </Box>

        <Button
          component="label"
          htmlFor={FILE_INPUT_ID}
          variant="outlined"
          size="small"
          disabled={loading}
        >
          {t('change')}
        </Button>

        {avatarUrl && (
          <Button variant="text" size="small" color="error" disabled={loading} onClick={onRemove}>
            {t('remove')}
          </Button>
        )}
      </Stack>

      <FileInputField
        name="avatar"
        control={control}
        id={FILE_INPUT_ID}
        disabled={loading}
        setUploading={setLoading}
      />
    </Stack>
  );
}
