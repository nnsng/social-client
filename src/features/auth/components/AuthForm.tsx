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
import { useAppSelector } from 'app/hooks';
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
import { translateFiles } from 'utils/translation';
import * as yup from 'yup';
import { selectAuthSubmitting } from '../authSlice';

export interface IAuthFormProps {
  defaultValues: IAuthFormValues;
  mode: 'login' | 'register';
  switchMode?: () => void;
  onSubmit?: (formValues: IAuthFormValues) => void;
  onGoogleLogin?: () => void;
  onForgotPassword?: (email: string) => void;
}

export default function AuthForm(props: IAuthFormProps) {
  const { defaultValues, mode, switchMode, onSubmit, onGoogleLogin, onForgotPassword } = props;
  const isRegisterMode = mode === 'register';

  const { t } = useTranslation('authForm');
  const { validate, toast: toastTranslation } = translateFiles('validate', 'toast');

  const authSubmitting = useAppSelector(selectAuthSubmitting);

  const [forgotLoading, setForgotLoading] = useState<boolean>(false);

  const validateSchema = getValidateSchema(mode, validate);

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
    reset();
  }, [mode]);

  const handleSwitchMode = () => {
    if (authSubmitting) return;
    switchMode?.();
  };

  const handleFormSubmit = (formValues: IAuthFormValues) => {
    onSubmit?.(formValues);
  };

  const handleGoogleLogin = () => {
    if (authSubmitting) return;
    onGoogleLogin?.();
  };

  const handleForgotPassword = async () => {
    if (authSubmitting) return;

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
            {t(`title.${mode}`, { appName: APP_NAME })}
          </Typography>
        </Stack>

        <Stack direction="column" spacing={2} mt={4} px={{ xs: 4, sm: 16 }}>
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
                  disabled={authSubmitting}
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
            disabled={authSubmitting}
            startIcon={authSubmitting && <CircularProgress size={20} color="primary" />}
            sx={{ fontSize: 16 }}
          >
            {t(`button.${mode}`)}
          </AuthButton>

          {!isRegisterMode && (
            <AuthButton
              variant="outlined"
              startIcon={<GoogleIcon width={24} />}
              onClick={handleGoogleLogin}
            >
              {t('googleLogin')}
            </AuthButton>
          )}

          <Box textAlign="center">
            <Typography component="span" fontSize={14} fontWeight={400} sx={{ cursor: 'default' }}>
              {t(`text.${mode}`)}{' '}
            </Typography>

            <Typography
              component="span"
              color="primary"
              fontSize={14}
              fontWeight={500}
              onClick={handleSwitchMode}
              sx={{ cursor: 'pointer' }}
            >
              {t(`switch.${mode}`)}
            </Typography>
          </Box>

          {!isRegisterMode && (
            <Stack direction="column" alignItems="center" justifyContent="center">
              <Button
                variant="text"
                disabled={forgotLoading}
                onClick={handleForgotPassword}
                sx={{
                  p: 0,
                  bgcolor: 'transparent !important',
                }}
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

function getValidateSchema(mode: 'login' | 'register', validateMessage: any) {
  if (mode === 'login') {
    return {
      name: yup.string(),
      username: yup.string(),
    };
  }

  return {
    name: yup
      .string()
      .required(validateMessage.name.required)
      .max(30, validateMessage.name.max(30)),
    username: yup
      .string()
      .required(validateMessage.username.required)
      .min(6, validateMessage.username.min(6))
      .max(20, validateMessage.username.max(20))
      .matches(/^[a-zA-Z0-9_\.]+$/, validateMessage.username.valid),
  };
}
