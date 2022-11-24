import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { MuiTextField } from 'components/formFields';
import i18next from 'i18next';
import { ChangePasswordFormValues, FormField } from 'models';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { showErrorToast } from 'utils/toast';
import { translateFiles } from 'utils/translation';
import * as yup from 'yup';

export interface ChangePasswordFormProps {
  fieldList: FormField[];
  defaultValues: ChangePasswordFormValues;
  onSubmit: (formValues: ChangePasswordFormValues) => void;
  forgotPassword?: () => void;
  submitButtonLabel?: string;
}

export default function ChangePasswordForm(props: ChangePasswordFormProps) {
  const { fieldList, defaultValues, onSubmit, forgotPassword, submitButtonLabel } = props;
  const isChangePasswordMode = !!forgotPassword;

  const { t } = useTranslation('changePasswordForm');
  const { validate, toast: toastTranslation } = translateFiles('validate', 'toast');

  const schema = yup.object().shape({
    currentPassword: isChangePasswordMode
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

  const handleFormSubmit = async (formValues: ChangePasswordFormValues) => {
    try {
      await onSubmit(formValues);
      reset();

      if (isChangePasswordMode) {
        toast.success(toastTranslation.changePasswordForm.success);
      }
    } catch (error) {
      showErrorToast(error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      forgotPassword?.();
      toast.info(toastTranslation.changePasswordForm.info);
    } catch (error) {
      showErrorToast(error);
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
              rounded
              sx={{ maxWidth: 400 }}
              {...props}
            />
          ))}

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              startIcon={isSubmitting && <CircularProgress size={20} />}
              sx={{ mr: 2, borderRadius: 40, fontSize: 13 }}
            >
              {submitButtonLabel ?? t('btnLabel.changePassword')}
            </Button>

            {isChangePasswordMode && (
              <Button
                color="primary"
                size="small"
                onClick={handleForgotPassword}
                sx={{
                  mt: { xs: 1, sm: 0 },
                  fontSize: 13,
                  '&:hover': { bgcolor: 'transparent' },
                }}
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
