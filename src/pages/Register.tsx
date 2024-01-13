import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { AuthForm } from '~/components/auth';
import { useAuthentication, usePageTitle } from '~/hooks';
import { FormField, RegisterFormValues } from '~/models';
import { useAppSelector } from '~/store/hooks';
import { selectAuthSubmitting } from '~/store/slices/userSlice';

export function RegisterPage() {
  const { t } = useTranslation('registerPage');
  const { t: tValidate } = useTranslation('validate');

  const submitting = useAppSelector(selectAuthSubmitting);

  const { register } = useAuthentication();

  usePageTitle(t('pageTitle'));

  const schema = z.object({
    email: z.string().min(1, tValidate('required')).email(tValidate('invalid')),
    password: z
      .string()
      .min(6, tValidate('min', { min: 6 }))
      .max(255, tValidate('max', { max: 255 })),
    name: z
      .string()
      .min(1, tValidate('required'))
      .max(30, tValidate('max', { max: 30 })),
    username: z
      .string()
      .min(6, tValidate('min', { min: 6 }))
      .max(20, tValidate('max', { max: 20 }))
      .regex(/^(?![-.])[a-zA-Z0-9.-]+(?<![-.])$/, tValidate('notAllowed')),
  });

  const { control, handleSubmit } = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      username: '',
    },
    resolver: zodResolver(schema),
  });

  const submitForm = (formValues: RegisterFormValues) => {
    register(formValues);
  };

  const fieldList: FormField[] = [
    { name: 'name' },
    { name: 'username' },
    { name: 'email' },
    { name: 'password', props: { type: 'password' } },
  ];

  return (
    <Box>
      <AuthForm
        name="register"
        control={control}
        fieldList={fieldList}
        onSubmit={handleSubmit(submitForm)}
        submitting={submitting}
      />

      <Box textAlign="center" my={1}>
        <Typography variant="body2" component="span" sx={{ cursor: 'default' }}>
          {t('text')}{' '}
        </Typography>

        <Typography component={Link} to="/login" variant="body2" color="primary" fontWeight={500}>
          {t('login')}
        </Typography>
      </Box>
    </Box>
  );
}
