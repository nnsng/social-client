import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { FileInputField, MuiTextField } from 'components/formFields';
import { selectCdnLoading } from 'features/cdn/cdnSlice';
import i18next from 'i18next';
import { User } from 'models';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
    name: yup.string().required(validate.fullName.required).max(255, validate.fullName.max(255)),
    avatar: yup.string(),
    username: yup
      .string()
      .min(6, validate.username.min(6))
      .max(50, validate.username.max(20))
      .matches(/^(?![_.])[a-zA-Z0-9._]+(?<![_.])$/, validate.username.valid),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .max(10)
      .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/, validate.phone.valid),
  });

  const { control, handleSubmit, getValues, reset, clearErrors } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const imageLoading = useAppSelector(selectCdnLoading);

  useEffect(() => {
    clearErrors();
  }, [i18next.language]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box pb={3}>
        <Grid container spacing={2}>
          <Grid item container alignItems="center">
            <Typography
              variant="h6"
              fontSize={18}
              fontWeight="500"
              mb={0.5}
              width={160}
              sx={{ userSelect: 'none' }}
            >
              {t('label.fullName')}
            </Typography>

            <MuiTextField
              name="name"
              control={control}
              variant="outlined"
              placeholder={t('label.fullName')}
              sx={{ maxWidth: 400 }}
            />
          </Grid>

          <Grid item container alignItems="center">
            <Typography
              variant="h6"
              fontSize={18}
              fontWeight="500"
              mb={0.5}
              width={160}
              sx={{ userSelect: 'none' }}
            >
              {t('label.avatar')}
            </Typography>

            <Grid item xs={12}>
              <Box
                component="label"
                htmlFor="avatar-upload"
                sx={{
                  position: 'relative',
                  display: 'inline-block',
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

                {imageLoading && (
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
            </Grid>
          </Grid>

          <Grid item container alignItems="center">
            <Typography
              variant="h6"
              fontSize={18}
              fontWeight="500"
              mb={0.5}
              width={160}
              sx={{ userSelect: 'none' }}
            >
              {t('label.username')}
            </Typography>

            <MuiTextField
              name="username"
              control={control}
              variant="outlined"
              placeholder={t('label.username')}
              sx={{ maxWidth: 400 }}
            />
          </Grid>

          <Grid item container alignItems="center">
            <Typography
              variant="h6"
              fontSize={18}
              fontWeight="500"
              mb={0.5}
              width={160}
              sx={{ userSelect: 'none' }}
            >
              {t('label.email')}
            </Typography>

            <MuiTextField
              name="email"
              control={control}
              variant="outlined"
              placeholder={t('label.email')}
              sx={{ maxWidth: 400 }}
              disabled
            />
          </Grid>

          <Grid item container alignItems="center">
            <Typography
              variant="h6"
              fontSize={18}
              fontWeight="500"
              mb={0.5}
              width={160}
              sx={{ userSelect: 'none' }}
            >
              {t('label.phone')}
            </Typography>

            <MuiTextField
              name="phone"
              control={control}
              variant="outlined"
              placeholder={t('label.phone')}
              sx={{ maxWidth: 400 }}
            />
          </Grid>

          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={submitting || imageLoading}
              startIcon={submitting && <CircularProgress size={20} />}
            >
              {t('save')}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
