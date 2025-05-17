import { User } from '@/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { MuiTextField } from '../formFields';
import { AvatarField } from './AvatarField';
export interface EditProfileFormProps {
  defaultValues: Partial<User>;
  onSubmit?: (formValues: Partial<User>) => void;
}

export function EditProfileForm(props: EditProfileFormProps) {
  const { defaultValues, onSubmit } = props;

  const { t } = useTranslation('editProfileForm');
  const { t: tValidate } = useTranslation('validate');

  const schema = z.object({
    name: z
      .string()
      .min(1, tValidate('required'))
      .max(30, tValidate('max', { max: 30 })),
    avatar: z.string(),
    username: z
      .string()
      .min(6, tValidate('min', { min: 6 }))
      .max(20, tValidate('max', { max: 20 }))
      .regex(/^(?![-.])[a-zA-Z0-9.-]+(?<![-.])$/, tValidate('notAllowed')),
    email: z.string().min(1, tValidate('required')).email(),
    bio: z.string().max(100, tValidate('max', { max: 100 })),
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const avatarUrl = watch('avatar');

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    clearErrors();
  }, [i18next.language]);

  const removeAvatar = () => setValue('avatar', '');

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit!)}>
      <Stack direction="column" spacing={2}>
        <AvatarField
          name="avatar"
          control={control}
          avatarUrl={avatarUrl || ''}
          loading={uploading}
          setLoading={setUploading}
          onRemove={removeAvatar}
          t={t}
        />

        <MuiTextField name="name" control={control} variant="outlined" label={t('label.name')} />

        <MuiTextField
          name="username"
          control={control}
          variant="outlined"
          label={t('label.username')}
        />

        <MuiTextField
          name="email"
          control={control}
          variant="outlined"
          label={t('label.email')}
          disabled
        />

        <MuiTextField
          name="bio"
          control={control}
          variant="outlined"
          label={t('label.bio')}
          multiline={true}
          rows={3}
          optional={true}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            startIcon={isSubmitting && <CircularProgress size={20} />}
          >
            {t('submit')}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
