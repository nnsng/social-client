import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import i18next from 'i18next';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { CommonForm } from '~/components/common';
import { useCustomMediaQuery } from '~/hooks';
import { ChangePasswordFormValues, FormField } from '~/models';
import { showErrorToastFromServer, showToast } from '~/utils/toast';

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
      .required(tValidate('currentPassword.required'))
      .min(6, tValidate('password.min', { min: 6 })),
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

  const fieldList: FormField[] = [
    { name: 'currentPassword' },
    { name: 'newPassword' },
    { name: 'confirmPassword' },
  ];

  const LABEL_WIDTH = 160;
  const smUp = useCustomMediaQuery('up', 'sm');

  return (
    <CommonForm
      name="changePasswordForm"
      fieldList={fieldList}
      control={control}
      onSubmit={handleSubmit(submitForm)}
      submitting={isSubmitting}
      horizontal={smUp}
      labelWidth={LABEL_WIDTH}
      commonProps={{
        type: 'password',
      }}
      action={
        <Button
          onClick={onForgotPassword}
          sx={{
            mt: { xs: 1, sm: 0 },
            ml: { xs: 0, sm: 3 },
          }}
        >
          {t('forgotPassword')}
        </Button>
      }
    />
  );
}
