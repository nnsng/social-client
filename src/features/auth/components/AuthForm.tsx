import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Typography } from '@mui/material';
import { GoogleIcon } from 'components/common';
import { MuiTextField } from 'components/formFields';
import useLoginWithGoogle from 'hooks/useLoginWithGoogle';
import i18next from 'i18next';
import { AuthFormValue } from 'models';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTranslateFiles } from 'utils/translation';
import * as yup from 'yup';

export interface AuthFormProps {
  defaultValues: AuthFormValue;
  switchMode?: () => void;
  onSubmit?: (formValues: AuthFormValue) => void;
}

export default function AuthForm(props: AuthFormProps) {
  const { defaultValues, switchMode, onSubmit } = props;
  const isRegisterMode = defaultValues.mode === 'register';

  const { t } = useTranslation('authForm');
  const { validate } = useTranslateFiles('validate');

  const schema = yup.object().shape({
    email: yup.string().required(validate.email.required).email(validate.email.email),
    password: yup.string().required(validate.password.required).min(6, validate.password.min(6)),
    mode: yup.string().required(),
    firstName: yup.string().when('mode', {
      is: 'register',
      then: yup.string().required(validate.firstName.required),
    }),
    lastName: yup.string().when('mode', {
      is: 'register',
      then: yup.string().required(validate.firstName.lastName),
    }),
  });

  const { control, handleSubmit, reset, clearErrors } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    clearErrors();
  }, [i18next.language]);

  const googleLogin = useLoginWithGoogle();

  const handleSwitchMode = () => {
    reset();
    switchMode?.();
  };

  const handleFormSubmit = (formValues: AuthFormValue) => {
    onSubmit?.(formValues);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box
        sx={{
          width: '100%',
          maxWidth: 450,
          py: 5,
          px: 4,
          bgcolor: 'background.default',
          borderRadius: 3,
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              color="primary"
              mb={2}
              fontSize={48}
              fontWeight="600"
              textAlign="center"
              sx={{ userSelect: 'none' }}
            >
              {isRegisterMode ? t('title.register') : t('title.login')}
            </Typography>
          </Grid>

          {isRegisterMode && (
            <>
              <MuiTextField
                name="firstName"
                control={control}
                label={t('label.firstName')}
                variant="outlined"
                size="medium"
                half
              />

              <MuiTextField
                name="lastName"
                control={control}
                label={t('label.lastName')}
                variant="outlined"
                size="medium"
                half
              />
            </>
          )}

          <MuiTextField
            name="email"
            control={control}
            label={t('label.email')}
            variant="outlined"
            size="medium"
          />

          <MuiTextField
            name="password"
            control={control}
            label={t('label.password')}
            variant="outlined"
            type="password"
            size="medium"
          />

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              {isRegisterMode ? t('title.register') : t('title.login')}
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              fullWidth
              startIcon={<GoogleIcon width={24} height={24} />}
              onClick={googleLogin}
            >
              {t('googleLogin')}
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Box textAlign="center" sx={{ userSelect: 'none' }}>
              <Typography variant="subtitle2" component="span" sx={{ cursor: 'default' }}>
                {isRegisterMode ? t('text.hadAccount') : t('text.noAccount')}&nbsp;
              </Typography>

              <Typography
                variant="subtitle2"
                component="span"
                color="primary"
                sx={{ cursor: 'pointer' }}
                onClick={handleSwitchMode}
              >
                {isRegisterMode ? t('title.login') : t('title.register')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
