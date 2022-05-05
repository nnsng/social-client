import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, ButtonProps, Stack, Typography } from '@mui/material';
import { GoogleIcon } from 'components/common';
import { MuiTextField } from 'components/formFields';
import useLoginWithGoogle from 'hooks/useLoginWithGoogle';
import i18next from 'i18next';
import { IAuthFormValues, IField } from 'models';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTranslateFiles } from 'utils/translation';
import * as yup from 'yup';

export interface IAuthFormProps {
  defaultValues: IAuthFormValues;
  switchMode?: () => void;
  onSubmit?: (formValues: IAuthFormValues) => void;
}

export default function AuthForm(props: IAuthFormProps) {
  const { defaultValues, switchMode, onSubmit } = props;
  const isRegisterMode = defaultValues.mode === 'register';

  const { t } = useTranslation('authForm');
  const { validate } = useTranslateFiles('validate');

  const schema = yup.object().shape({
    email: yup.string().required(validate.email.required).email(validate.email.email),
    password: yup
      .string()
      .required(validate.password.required)
      .min(6, validate.password.min(6))
      .max(255, validate.password.max(255)),
    mode: yup.string().required(),
    name: yup.string().when('mode', {
      is: 'register',
      then: yup.string().required(validate.name.required).max(255, validate.name.max(255)),
    }),
    username: yup.string().when('mode', {
      is: 'register',
      then: yup
        .string()
        .required(validate.username.required)
        .min(6, validate.username.min(6))
        .max(50, validate.username.max(20))
        .matches(/^[a-zA-Z0-9_\.]+$/, validate.username.valid),
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

  const handleFormSubmit = (formValues: IAuthFormValues) => {
    onSubmit?.(formValues);
  };

  const fieldList: IField[] = [
    {
      name: 'name',
      show: isRegisterMode,
      props: {},
    },
    {
      name: 'username',
      show: isRegisterMode,
      props: {},
    },
    {
      name: 'email',
      show: true,
      props: {},
    },
    {
      name: 'password',
      show: true,
      props: {
        type: 'password',
      },
    },
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} style={{ width: '100%' }}>
      <Box
        sx={{
          maxWidth: 450,
          py: 5,
          px: 4,
          m: 'auto',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        }}
      >
        <Stack direction="column" spacing={2}>
          <Typography
            variant="h4"
            color="primary"
            sx={{
              mb: 2,
              fontSize: 48,
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            {t(`title.${defaultValues.mode}`).toUpperCase()}
          </Typography>

          {fieldList.map(
            ({ name, show, props }) =>
              show && (
                <MuiTextField
                  key={name}
                  name={name}
                  control={control}
                  label={t(`label.${name}`)}
                  variant="outlined"
                  size="medium"
                  {...props}
                />
              )
          )}

          <AuthButton type="submit" variant="contained">
            {t(`title.${defaultValues.mode}`)}
          </AuthButton>

          {!isRegisterMode && (
            <AuthButton
              variant="outlined"
              startIcon={<GoogleIcon width={24} height={24} />}
              onClick={googleLogin}
            >
              {t('googleLogin')}
            </AuthButton>
          )}

          <Box textAlign="center">
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

          {!isRegisterMode && (
            <Typography
              variant="subtitle2"
              component="span"
              color="primary"
              textAlign="center"
              sx={{ cursor: 'pointer' }}
            >
              {t('forgotPassword')}
            </Typography>
          )}
        </Stack>
      </Box>
    </form>
  );
}

function AuthButton({ children, ...props }: ButtonProps) {
  return (
    <Button color="primary" fullWidth sx={{ fontSize: '1rem', height: 48 }} {...props}>
      {children}
    </Button>
  );
}
