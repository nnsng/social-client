import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { MuiTextField } from 'components/formFields';
import i18next from 'i18next';
import { ChangePasswordFormValue } from 'models';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useTranslateFiles } from 'utils/translation';
import * as yup from 'yup';

export interface ChangePasswordFormProps {
  defaultValues: ChangePasswordFormValue;
  onSubmit: (formValues: ChangePasswordFormValue) => void;
  forgotPassword?: () => void;
}

export default function ChangePasswordForm(props: ChangePasswordFormProps) {
  const { defaultValues, onSubmit, forgotPassword } = props;

  const { t } = useTranslation('changePasswordForm');
  const { validate, toast: toastTranslation } = useTranslateFiles('validate', 'toast');

  const schema = yup.object().shape({
    currentPassword: yup
      .string()
      .required(validate.currentPassword.required)
      .min(6, validate.password.min(6)),
    newPassword: yup
      .string()
      .required(validate.newPassword.required)
      .min(6, validate.password.min(6)),
    confirmPassword: yup
      .string()
      .required(validate.confirmPassword.required)
      .oneOf([yup.ref('newPassword'), null], validate.confirmPassword.match),
  });

  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    formState: { isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    clearErrors();
  }, [i18next.language]);

  const handleFormSubmit = async (formValues: ChangePasswordFormValue) => {
    try {
      await onSubmit(formValues);
      reset();
      toast.success(toastTranslation.changePasswordForm.success);
    } catch (error: any) {
      const errorName = error?.response?.data?.name || 'somethingWrong';
      toast.error(toastTranslation.errors[errorName]);
    }
  };

  const formControlItems = [
    {
      label: t('label.currentPassword'),
      name: 'currentPassword',
    },
    {
      label: t('label.newPassword'),
      name: 'newPassword',
    },
    {
      label: t('label.confirmPassword'),
      name: 'confirmPassword',
    },
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box pb={3}>
        <Stack direction="column" spacing={2}>
          {formControlItems.map(({ label, name }, idx) => (
            <MuiTextField
              key={idx}
              name={name}
              control={control}
              type="password"
              variant="outlined"
              placeholder={label}
              title={label}
              sx={{ maxWidth: 400 }}
            />
          ))}

          <Stack alignItems="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              startIcon={isSubmitting && <CircularProgress size={20} />}
            >
              {t('btnLabel.changePassword')}
            </Button>

            <Button
              color="primary"
              size="small"
              sx={{
                ml: { xs: 2, sm: 3 },
                ':hover': { bgcolor: 'transparent' },
              }}
              onClick={forgotPassword}
            >
              {t('btnLabel.forgotPassword')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </form>
  );
}
