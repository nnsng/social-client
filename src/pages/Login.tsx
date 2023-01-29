import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { authApi } from '~/api';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { AuthForm } from '~/components/auth';
import { useLoginWithGoogle, usePageTitle } from '~/hooks';
import { FormField, LoginFormValues } from '~/models';
import { selectAuthSubmitting, userActions } from '~/redux/slices/userSlice';
import { validateEmail } from '~/utils/common';
import { showErrorToastFromServer, showToast } from '~/utils/toast';

export function LoginPage() {
  const navigate = useNavigate();

  const { t } = useTranslation('loginPage');
  const { t: tValidate } = useTranslation('validate');

  const dispatch = useAppDispatch();
  const submitting = useAppSelector(selectAuthSubmitting);

  const googleLogin = useLoginWithGoogle();

  const [forgotLoading, setForgotLoading] = useState(false);

  usePageTitle(t('pageTitle'), true);

  const schema = yup.object().shape({
    email: yup.string().required(tValidate('required')).email(tValidate('invalid')),
    password: yup
      .string()
      .required(tValidate('required'))
      .min(6, tValidate('min', { min: 6 }))
      .max(255, tValidate('max', { max: 255 })),
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
        toast.error(tValidate('email.required'));
        return;
      }

      if (!validateEmail(email)) {
        toast.error(tValidate('email.email'));
        return;
      }

      setForgotLoading(true);

      await authApi.forgotPassword(email);
      showToast('checkEmail', 'info');
    } catch (error) {
      showErrorToastFromServer(error);
    }

    setForgotLoading(false);
  };

  const fieldList: FormField[] = [
    { name: 'email' },
    { name: 'password', props: { type: 'password' } },
  ];

  return (
    <Box>
      <AuthForm
        name="login"
        control={control}
        fieldList={fieldList}
        onSubmit={handleSubmit(submitForm)}
        submitting={submitting}
        onGoogleLogin={googleLogin}
      />

      <Box textAlign="center" my={1}>
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

        {forgotLoading && <CircularProgress size={20} sx={{ mt: 1 }} />}
      </Stack>
    </Box>
  );
}
