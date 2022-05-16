import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { MuiTextField } from 'components/formFields';
import i18next from 'i18next';
import { IChangePasswordFormValues, IField } from 'models';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { getErrorMessage } from 'utils/toast';
import { useTranslateFiles } from 'utils/translation';
import * as yup from 'yup';

export interface IChangePasswordFormProps {
  fieldList: IField[];
  defaultValues: IChangePasswordFormValues;
  onSubmit: (formValues: IChangePasswordFormValues) => void;
  forgotPassword?: () => void;
  submitButtonLabel?: string;
}

export default function ChangePasswordForm(props: IChangePasswordFormProps) {
  const { fieldList, defaultValues, onSubmit, forgotPassword, submitButtonLabel } = props;
  const isChangeMode = !!forgotPassword;

  const { t } = useTranslation('changePasswordForm');
  const { validate, toast: toastTranslation } = useTranslateFiles('validate', 'toast');

  const schema = yup.object().shape({
    currentPassword: isChangeMode
      ? yup.string().required(validate.currentPassword.required).min(6, validate.password.min(6))
      : yup.string().notRequired(),
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

  const handleFormSubmit = async (formValues: IChangePasswordFormValues) => {
    try {
      await onSubmit(formValues);
      reset();
      isChangeMode && toast.success(toastTranslation.changePasswordForm.success);
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleForgotPassword = async () => {
    try {
      forgotPassword?.();
      toast.info(toastTranslation.changePasswordForm.info);
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box>
        <Stack direction="column" spacing={2}>
          {fieldList.map(({ name, props }) => (
            <MuiTextField
              key={name}
              name={name}
              control={control}
              type="password"
              variant="outlined"
              placeholder={t(`label.${name}`)}
              title={t(`label.${name}`)}
              sx={{ maxWidth: 400 }}
              {...props}
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
              {submitButtonLabel ?? t('btnLabel.changePassword')}
            </Button>

            {isChangeMode && (
              <Button
                color="primary"
                size="small"
                sx={{
                  ml: { xs: 2, sm: 3 },
                  '&:hover': { bgcolor: 'transparent' },
                }}
                onClick={handleForgotPassword}
              >
                {t('btnLabel.forgotPassword')}
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </form>
  );
}
