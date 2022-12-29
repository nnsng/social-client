import { yupResolver } from '@hookform/resolvers/yup';
import i18next from 'i18next';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { CommonForm } from '~/components/common';
import { ChangePasswordFormValues, FormField } from '~/models';
import { showErrorToastFromServer, showToast } from '~/utils/toast';

export interface ChangePasswordFormProps {
  defaultValues: ChangePasswordFormValues;
  onSubmit?: (formValues: ChangePasswordFormValues) => void;
  onForgotPassword?: () => void;
}

export function ChangePasswordForm(props: ChangePasswordFormProps) {
  const { defaultValues, onSubmit, onForgotPassword } = props;

  const { t } = useTranslation('validate');

  const schema = yup.object().shape({
    currentPassword: yup
      .string()
      .required(t('currentPassword.required'))
      .min(6, t('password.min', { min: 6 })),
    newPassword: yup
      .string()
      .required(t('newPassword.required'))
      .min(6, t('password.min', { min: 6 })),
    confirmPassword: yup
      .string()
      .required(t('confirmPassword.required'))
      .oneOf([yup.ref('newPassword'), null], t('confirmPassword.match')),
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

  return (
    <CommonForm
      name="changePasswordForm"
      fieldList={fieldList}
      control={control}
      onSubmit={handleSubmit(submitForm)}
      submitting={isSubmitting}
      commonProps={{
        type: 'password',
      }}
      onForgotPassword={onForgotPassword}
    />
  );
}
