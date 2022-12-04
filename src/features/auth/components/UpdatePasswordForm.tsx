import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container, Typography } from '@mui/material';
import { authApi } from 'api';
import { CommonForm } from 'components/common';
import { usePageTitle } from 'hooks';
import { ChangePasswordFormValues, FormField } from 'models';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { themeMixins } from 'utils/theme';
import { translateFiles } from 'utils/translation';
import * as yup from 'yup';

export interface UpdatePasswordFormProps {
  token: string;
}

export function UpdatePasswordForm({ token }: UpdatePasswordFormProps) {
  if (!token) return null;

  const navigate = useNavigate();

  const { t } = useTranslation('updatePasswordForm');
  const { t: tValidate } = useTranslation('validate');

  usePageTitle(t('pageTitle'));

  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .required(tValidate('newPassword.required'))
      .min(6, tValidate('password.min', { min: 6 })),
    confirmPassword: yup
      .string()
      .required(tValidate('confirmPassword.required'))
      .oneOf([yup.ref('newPassword'), null], tValidate('confirmPassword.match')),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    defaultValues: {
      token,
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const submitForm = async (formValues: ChangePasswordFormValues) => {
    await authApi.resetPassword(formValues);
    navigate('/login', { replace: true });
  };

  const fieldList: FormField[] = [{ name: 'newPassword' }, { name: 'confirmPassword' }];

  return (
    <Container maxWidth="sm">
      <Box mt={3} p={3} sx={{ ...themeMixins.paperBorder() }}>
        <Typography variant="h5" component="h2" fontWeight={600} mb={2}>
          {t('pageTitle')}
        </Typography>

        <CommonForm
          name="updatePasswordForm"
          fieldList={fieldList}
          control={control}
          onSubmit={handleSubmit(submitForm)}
          submitting={isSubmitting}
          commonProps={{
            type: 'password',
          }}
        />
      </Box>
    </Container>
  );
}
