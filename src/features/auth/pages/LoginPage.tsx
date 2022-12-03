import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { authApi } from 'api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AuthLayout } from 'components/layouts';
import { useLoginWithGoogle, usePageTitle } from 'hooks';
import { FormField, LoginFormValues } from 'models';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateEmail } from 'utils/common';
import { themeMixins } from 'utils/theme';
import { showErrorToast } from 'utils/toast';
import { translateFiles } from 'utils/translation';
import * as yup from 'yup';
import { AuthForm } from '../components';
import { selectAuthSubmitting, userActions } from '../userSlice';

export function LoginPage() {
  const navigate = useNavigate();

  const { t } = useTranslation('loginPage');
  const { validate, toast: toastTranslation } = translateFiles('validate', 'toast');

  const dispatch = useAppDispatch();
  const submitting = useAppSelector(selectAuthSubmitting);

  const googleLogin = useLoginWithGoogle();

  const [forgotLoading, setForgotLoading] = useState(false);

  usePageTitle(t('pageTitle'), true);

  const schema = yup.object().shape({
    email: yup.string().required(validate.email.required).email(validate.email.email),
    password: yup
      .string()
      .required(validate.password.required)
      .min(6, validate.password.min(6))
      .max(255, validate.password.max(255)),
  });

  const { control, handleSubmit, getValues } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const submitForm = (formValues: LoginFormValues) => {
    dispatch(userActions.login({ formValues, navigate }));
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

      await authApi.forgotPassword(email);
      toast.info(toastTranslation.changePasswordForm.info);
    } catch (error) {
      showErrorToast(error);
    }

    setForgotLoading(false);
  };

  const fieldList: FormField[] = [
    { name: 'email' },
    { name: 'password', props: { type: 'password' } },
  ];

  return (
    <AuthLayout>
      <Box>
        <AuthForm
          name="login"
          control={control}
          fieldList={fieldList}
          onSubmit={handleSubmit(submitForm)}
          submitting={submitting}
          onGoogleLogin={googleLogin}
        />

        <Box textAlign="center" mt={2} mb={1}>
          <Typography variant="body2" component="span" sx={{ cursor: 'default' }}>
            {t('text')}{' '}
          </Typography>

          <Typography
            component={Link}
            to="/register"
            variant="body2"
            color="primary"
            fontWeight={500}
          >
            {t('register')}
          </Typography>
        </Box>

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
      </Box>
    </AuthLayout>
  );
}
