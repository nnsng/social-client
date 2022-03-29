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
import { profileSchema } from 'utils/schema';
export interface EditProfileFromProps {
  submitting: boolean;
  defaultValues: User;
  onSubmit: (formValues: User) => void;
}

export default function EditProfileFrom(props: EditProfileFromProps) {
  const { submitting, defaultValues, onSubmit } = props;

  const { t } = useTranslation('editProfileForm');

  const { control, handleSubmit, getValues, reset, clearErrors } = useForm({
    defaultValues,
    resolver: yupResolver(profileSchema),
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
