import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { MuiTextField } from 'components/formFields';
import { GoogleIcon } from 'components/icons';
import i18next from 'i18next';
import { IAuthFormValues, IField } from 'models';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { validateEmail } from 'utils/common';
import { APP_NAME } from 'utils/constants';
import { themeMixins } from 'utils/theme';
import { showErrorToast } from 'utils/toast';
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

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [forgotLoading, setForgotLoading] = useState<boolean>(false);

  const validateSchema = getValidateSchema(defaultValues.mode, validate);

  const schema = yup.object().shape({
    email: yup.string().required(validate.email.required).email(validate.email.email),
    password: yup
      .string()
      .required(validate.password.required)
      .min(6, validate.password.min(6))
      .max(255, validate.password.max(255)),
    mode: yup.string().required().oneOf(['login', 'register']),
    name: validateSchema.name,
    username: validateSchema.username,
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
    setSubmitLoading(true);
    onSubmit?.(formValues);
    setSubmitLoading(false);
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
      setForgotLoading(true);
      await onForgotPassword?.(email);
      toast.info(toastTranslation.changePasswordForm.info);
    } catch (error) {
      showErrorToast(error);
    }
    setForgotLoading(false);
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
          borderRadius: { xs: 0, sm: 4 },
          position: 'relative',
          zIndex: 2,
          maxWidth: 640,
          height: { xs: '100vh', sm: 'fit-content' },
          minHeight: 600,
          py: 6,
          m: 'auto',
        }}
      >
        <Stack direction="column" alignItems="center" justifyContent="center">
          <Avatar
            sx={{
              width: 48,
              height: 48,
              fontSize: 32,
              fontWeight: 600,
              bgcolor: 'primary.main',
              color: 'common.white',
              mb: 2,
            }}
          >
            {APP_NAME[0]}
          </Avatar>

          <Typography color="text.primary" fontSize={24} fontWeight={600}>
            {t(`title.${defaultValues.mode}`, { appName: APP_NAME })}
          </Typography>
        </Stack>

        <Stack
          direction="column"
          spacing={2}
          sx={{
            mt: 4,
            px: { xs: 4, sm: 16 },
          }}
        >
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
                  rounded
                  {...props}
                  sx={{
                    '& input': {
                      py: 1.5,
                      fontSize: 16,
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: 16,
                      '&:not(.Mui-focused):not(.MuiFormLabel-filled)': {
                        top: -4,
                      },
                    },
                  }}
                />
              )
          )}

          <AuthButton
            type="submit"
            variant="contained"
            disabled={submitLoading}
            startIcon={submitLoading && <CircularProgress size={20} color="primary" />}
            sx={{ fontSize: 16 }}
          >
            {t(`button.${defaultValues.mode}`)}
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
            <Typography component="span" fontSize={14} fontWeight={400} sx={{ cursor: 'default' }}>
              {t(`text.${defaultValues.mode}`)}{' '}
            </Typography>

            <Typography
              component="span"
              fontSize={14}
              fontWeight={500}
              color="primary"
              sx={{ cursor: 'pointer' }}
              onClick={handleSwitchMode}
            >
              {t(`switch.${defaultValues.mode}`)}
            </Typography>
          </Box>

          {!isRegisterMode && (
            <Stack direction="column" alignItems="center" justifyContent="center">
              <Button
                variant="text"
                disabled={forgotLoading}
                onClick={handleForgotPassword}
                sx={{ p: 0, bgcolor: 'transparent !important' }}
              >
                {t('forgotPassword')}
              </Button>

              {forgotLoading && <CircularProgress size={20} color="primary" sx={{ mt: 1 }} />}
            </Stack>
          )}
        </Stack>
      </Stack>
    </form>
  );
}

function AuthButton({ children, ...props }: ButtonProps) {
  const { sx, ...restProps } = props;

  return (
    <Button
      color="primary"
      fullWidth
      sx={{
        height: 47,
        borderRadius: 40,
        ...sx,
      }}
      {...restProps}
    >
      {children}
    </Button>
  );
}

function getValidateSchema(mode: 'login' | 'register', translation: any) {
  if (mode === 'login') {
    return {
      name: yup.string(),
      username: yup.string(),
    };
  }

  return {
    name: yup.string().required(translation.name.required).max(255, translation.name.max(255)),
    username: yup
      .string()
      .required(translation.username.required)
      .min(6, translation.username.min(6))
      .max(50, translation.username.max(20))
      .matches(/^[a-zA-Z0-9_\.]+$/, translation.username.valid),
  };
}
