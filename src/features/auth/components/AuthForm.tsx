import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, ButtonProps, Stack, Typography } from '@mui/material';
import { GoogleIcon } from 'components/icons';
import { MuiTextField } from 'components/formFields';
import i18next from 'i18next';
import { IAuthFormValues, IField } from 'models';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { validateEmail } from 'utils/common';
import { themeMixins } from 'utils/theme';
import { getErrorMessage } from 'utils/toast';
import { useTranslateFiles } from 'utils/translation';
import * as yup from 'yup';

export interface IAuthFormProps {
  defaultValues: IAuthFormValues;
  switchMode?: () => void;
  onSubmit?: (formValues: IAuthFormValues) => void;
  onGoogleLogin?: () => void;
  onForgotPassword?: (email: string) => void;
}

export default function AuthForm(props: IAuthFormProps) {
  const { defaultValues, switchMode, onSubmit, onGoogleLogin, onForgotPassword } = props;
  const isRegisterMode = defaultValues.mode === 'register';

  const { t } = useTranslation('authForm');
  const { validate, toast: toastTranslation } = useTranslateFiles('validate', 'toast');

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

  const { control, handleSubmit, getValues, reset, clearErrors } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    clearErrors();
  }, [i18next.language]);

  const handleSwitchMode = () => {
    reset();
    switchMode?.();
  };

  const handleFormSubmit = (formValues: IAuthFormValues) => {
    onSubmit?.(formValues);
  };

  const handleForgotPassword = async () => {
    try {
      const email = getValues('email');
      if (email.trim().length === 0) {
        toast.error(validate.email.required);
        return;
      }
      if (!validateEmail(email)) {
        toast.error(validate.email.email);
        return;
      }
      await onForgotPassword?.(email);
      toast.info(toastTranslation.changePasswordForm.info);
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }
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
      <Stack
        direction="column"
        sx={{
          ...themeMixins.paperBorder(),
          maxWidth: 450,
          height: { xs: '100vh', sm: 'auto' },
          py: 5,
          px: 4,
          m: 'auto',
        }}
      >
        <Stack direction="column" spacing={2} my="auto">
          <Typography
            color="primary"
            fontSize={32}
            fontWeight={600}
            sx={{
              mb: 2,
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
              startIcon={<GoogleIcon width={24} />}
              onClick={onGoogleLogin}
            >
              {t('googleLogin')}
            </AuthButton>
          )}

          <Box textAlign="center">
            <Typography component="span" variant="subtitle2" sx={{ cursor: 'default' }}>
              {t(`text.${defaultValues.mode}`)}{' '}
            </Typography>

            <Typography
              component="span"
              variant="subtitle2"
              color="primary"
              sx={{ cursor: 'pointer' }}
              onClick={handleSwitchMode}
            >
              {t(`switch.${defaultValues.mode}`)}
            </Typography>
          </Box>

          {!isRegisterMode && (
            <Typography
              component="span"
              variant="subtitle2"
              color="primary"
              sx={{
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onClick={handleForgotPassword}
            >
              {t('forgotPassword')}
            </Typography>
          )}
        </Stack>
      </Stack>
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
