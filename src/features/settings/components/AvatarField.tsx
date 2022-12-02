import { Avatar, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { FileInputField } from 'components/formFields';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';

export interface AvatarFieldProps {
  control: Control<any>;
  avatarUrl: string;
  loading?: boolean;
  setLoading?: (value: boolean) => void;
  onRemove?: () => void;
}

export function AvatarField(props: AvatarFieldProps) {
  const { control, avatarUrl, loading, setLoading, onRemove } = props;

  const { t } = useTranslation('editProfileForm');

  return (
    <Stack direction="column" key="avatar">
      <Typography fontSize={{ xs: 14, sm: 16 }} fontWeight={500} sx={{ width: 160, mb: 0.5 }}>
        {t('label.avatar')}
      </Typography>

      <Stack alignItems="flex-end" spacing={2}>
        <Box
          component="label"
          htmlFor="avatar-upload"
          sx={{
            position: 'relative',
            display: 'inline-block',
            width: { xs: 56, sm: 68 },
            height: { xs: 56, sm: 68 },
          }}
        >
          <Avatar
            src={avatarUrl}
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              '&:hover::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                bgcolor: 'common.black',
                opacity: 0.3,
              },
            }}
          />
          <FileInputField
            name="avatar"
            control={control}
            id="avatar-upload"
            disabled={loading}
            setUploading={setLoading}
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

        {avatarUrl && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            disabled={loading}
            onClick={onRemove}
          >
            {t('remove')}
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
