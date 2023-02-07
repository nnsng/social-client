import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { User } from '~/models';
import { MuiTextField } from '../formFields';
import { AvatarField } from './AvatarField';

export interface EditProfileFromProps {
  defaultValues: Partial<User>;
  onSubmit?: (formValues: Partial<User>) => void;
}

export function EditProfileForm(props: EditProfileFromProps) {
  const { defaultValues, onSubmit } = props;

  const { t } = useTranslation('editProfileForm');
  const { t: tValidate } = useTranslation('validate');

  const schema = yup.object().shape({
    name: yup
      .string()
      .required(tValidate('required'))
      .max(30, tValidate('max', { max: 30 })),
    avatar: yup.string(),
    username: yup
      .string()
      .required(tValidate('required'))
      .min(6, tValidate('min', { min: 6 }))
      .max(20, tValidate('max', { max: 20 }))
      .matches(/^(?![-.])[a-zA-Z0-9.-]+(?<![-.])$/, tValidate('notAllowed')),
    email: yup.string().email().required(),
    bio: yup.string().max(100, tValidate('max', { max: 100 })),
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { isSubmitting },
  } = useForm<Partial<User>>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const avatarUrl = watch('avatar');

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    clearErrors();
  }, [i18next.language]);

  const removeAvatar = () => setValue('avatar', '');

  return (
    <Box component="form" onSubmit={onSubmit && handleSubmit(onSubmit)}>
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
