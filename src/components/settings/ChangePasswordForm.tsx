import { ChangePasswordFormValues } from '@/models';
import { showToast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import i18next from 'i18next';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
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

  const schema = z
    .object({
      currentPassword: z.string().min(6, tValidate('min', { min: 6 })),
      newPassword: z.string().min(6, tValidate('min', { min: 6 })),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: tValidate('notMatch'),
      path: ['confirmPassword'],
    });

  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    clearErrors();
  }, [i18next.language]);

  const submitForm = async (formValues: ChangePasswordFormValues) => {
    try {
      await onSubmit?.(formValues);
      reset();
      showToast('auth.changePassword');
    } catch (error) {}
  };

  const handleForgotPassword = async () => {
    try {
      await onForgotPassword?.();
      showToast('checkEmail', 'info');
    } catch (error) {}
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
