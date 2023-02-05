import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container } from '@mui/material';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { authApi } from '~/api';
import { CommonForm, PageTitle } from '~/components/common';
import { ChangePasswordFormValues, FormField } from '~/models';
import { themeMixins } from '~/utils/theme';

export function UpdatePasswordForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = queryString.parse(location.search)?.token as string;

  const { t } = useTranslation('updatePasswordForm');
  const { t: tValidate } = useTranslation('validate');

  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .required(tValidate('required'))
      .min(6, tValidate('password.min', { min: 6 })),
    confirmPassword: yup
      .string()
      .required(tValidate('required'))
      .oneOf([yup.ref('newPassword'), null], tValidate('notMatch')),
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
        <PageTitle uppercase={false}>{t('pageTitle')}</PageTitle>

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
