import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import i18next from 'i18next';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { ChangePasswordFormValues } from '~/models';
import { showErrorToastFromServer, showToast } from '~/utils/toast';
import { MuiTextField } from '../formFields';

export interface ChangePasswordFormProps {
  defaultValues: ChangePasswordFormValues;
  onSubmit?: (formValues: ChangePasswordFormValues) => void;
  onForgotPassword?: () => void;
}

export function ChangePasswordForm(props: ChangePasswordFormProps) {
  const { defaultValues, onSubmit, onForgotPassword } = props;

  const { t } = useTranslation('changePasswordForm');
  const { t: tValidate } = useTranslation('validate');

  const schema = yup.object().shape({
    currentPassword: yup
      .string()
      .required(tValidate('required'))
      .min(6, tValidate('min', { min: 6 })),
    newPassword: yup
      .string()
      .required(tValidate('required'))
      .min(6, tValidate('min', { min: 6 })),
    confirmPassword: yup
      .string()
      .required(tValidate('required'))
      .oneOf([yup.ref('newPassword'), null], tValidate('notMatch')),
  });

  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    formState: { isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    clearErrors();
  }, [i18next.language]);

  const submitForm = async (formValues: ChangePasswordFormValues) => {
    try {
      await onSubmit?.(formValues);
      reset();
      showToast('auth.changePassword');
    } catch (error) {
      showErrorToastFromServer(error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await onForgotPassword?.();
      showToast('checkEmail', 'info');
    } catch (error) {
      showErrorToastFromServer(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submitForm)}>
      <Stack direction="column" spacing={2}>
        <MuiTextField
          name="currentPassword"
          control={control}
          variant="outlined"
          label={t('label.currentPassword')}
          type="password"
        />

        <MuiTextField
          name="newPassword"
          control={control}
          variant="outlined"
          label={t('label.newPassword')}
          type="password"
        />

        <MuiTextField
          name="confirmPassword"
          control={control}
          variant="outlined"
          label={t('label.confirmPassword')}
          type="password"
        />

        <Stack direction={{ xs: 'column', sm: 'row' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            startIcon={isSubmitting && <CircularProgress size={20} />}
          >
            {t('submit')}
          </Button>

          <Button
            onClick={handleForgotPassword}
            sx={{
              mt: { xs: 1, sm: 0 },
              ml: { xs: 0, sm: 3 },
            }}
          >
            {t('forgotPassword')}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
