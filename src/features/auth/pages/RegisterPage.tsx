import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AuthLayout } from 'components/layouts';
import { usePageTitle } from 'hooks';
import { FormField, RegisterFormValues } from 'models';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { translateFiles } from 'utils/translation';
import * as yup from 'yup';
import { AuthForm } from '../components';
import { selectAuthSubmitting, userActions } from '../userSlice';

export function RegisterPage() {
  const navigate = useNavigate();

  const { t } = useTranslation('registerPage');
  const { validate } = translateFiles('validate');

  const dispatch = useAppDispatch();
  const submitting = useAppSelector(selectAuthSubmitting);

  usePageTitle(t('pageTitle'), true);

  const schema = yup.object().shape({
    email: yup.string().required(validate.email.required).email(validate.email.email),
    password: yup
      .string()
      .required(validate.password.required)
      .min(6, validate.password.min(6))
      .max(255, validate.password.max(255)),
    name: yup.string().required(validate.name.required).max(30, validate.name.max(30)),
    username: yup
      .string()
      .required(validate.username.required)
      .min(6, validate.username.min(6))
      .max(20, validate.username.max(20))
      .matches(/^[a-zA-Z0-9_\.]+$/, validate.username.valid),
  });

  const { control, handleSubmit } = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      username: '',
    },
    resolver: yupResolver(schema),
  });

  const submitForm = (formValues: RegisterFormValues) => {
    dispatch(userActions.register({ formValues, navigate }));
  };

  const fieldList: FormField[] = [
    { name: 'name' },
    { name: 'username' },
    { name: 'email' },
    { name: 'password', props: { type: 'password' } },
  ];

  return (
    <AuthLayout>
      <Box>
        <AuthForm
          name="register"
          control={control}
          fieldList={fieldList}
          onSubmit={handleSubmit(submitForm)}
          submitting={submitting}
        />

        <Box textAlign="center" mt={2} mb={1}>
          <Typography variant="body2" component="span" sx={{ cursor: 'default' }}>
            {t('text')}{' '}
          </Typography>

          <Typography component={Link} to="/login" variant="body2" color="primary" fontWeight={500}>
            {t('login')}
          </Typography>
        </Box>
      </Box>
    </AuthLayout>
  );
}
