import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { FileInputField, MuiTextField } from 'components/formFields';
import { selectUploading } from 'features/common/uploadSlice';
import i18next from 'i18next';
import { User } from 'models';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { REGEX } from 'utils/constants';
import { useTranslateFiles } from 'utils/translation';
import * as yup from 'yup';

export interface EditProfileFromProps {
  submitting: boolean;
  defaultValues: User;
  onSubmit: (formValues: User) => void;
}

export default function EditProfileFrom(props: EditProfileFromProps) {
  const { submitting, defaultValues, onSubmit } = props;

  const { t } = useTranslation('editProfileForm');
  const { validate } = useTranslateFiles('validate');

  const schema = yup.object().shape({
    name: yup.string().required(validate.name.required).max(255, validate.name.max(255)),
    avatar: yup.string(),
    username: yup
      .string()
      .required(validate.username.required)
      .min(6, validate.username.min(6))
      .max(50, validate.username.max(20))
      .matches(REGEX.username, validate.username.valid),
    email: yup.string().email().required(),
    bio: yup.string(),
  });

  const { control, handleSubmit, getValues, reset, clearErrors } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const uploading = useAppSelector(selectUploading);

  useEffect(() => {
    clearErrors();
  }, [i18next.language]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box pb={3}>
        <Stack direction="column" spacing={2}>
          <MuiTextField
            name="name"
            control={control}
            variant="outlined"
            placeholder={t('label.name')}
            title={t('label.name')}
            sx={{ maxWidth: 400 }}
          />

          <Stack direction="column">
            <Typography variant="h6" fontSize={18} fontWeight={500} mb={0.5} width={160}>
              {t('label.avatar')}
            </Typography>

            <Box
              component="label"
              htmlFor="avatar-upload"
              sx={{
                position: 'relative',
                display: 'inline-block',
                width: 68,
                height: 68,
              }}
            >
              <Avatar
                src={getValues('avatar')}
                sx={{
                  width: 68,
                  height: 68,
                  cursor: 'pointer',
                }}
              />
              <FileInputField name="avatar" control={control} id="avatar-upload" />

              {uploading && (
                <Stack
                  sx={{
                    position: 'absolute',
                    inset: '0',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '50%',
                  }}
                >
                  <CircularProgress size={24} />
                </Stack>
              )}
            </Box>
          </Stack>

          <MuiTextField
            name="username"
            control={control}
            variant="outlined"
            placeholder={t('label.username')}
            title={t('label.username')}
            sx={{ maxWidth: 400 }}
          />

          <MuiTextField
            name="email"
            control={control}
            variant="outlined"
            placeholder={t('label.email')}
            title={t('label.email')}
            sx={{ maxWidth: 400 }}
            disabled
          />

          <MuiTextField
            name="bio"
            control={control}
            variant="outlined"
            placeholder={t('label.bio')}
            title={t('label.bio')}
            sx={{ maxWidth: 400 }}
            multiline
            rows={3}
          />

          <Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={submitting || uploading}
              startIcon={submitting && <CircularProgress size={20} />}
            >
              {t('save')}
            </Button>
          </Box>
        </Stack>
      </Box>
    </form>
  );
}
