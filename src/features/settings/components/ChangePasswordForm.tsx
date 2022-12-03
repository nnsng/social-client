import { yupResolver } from '@hookform/resolvers/yup';
import { CommonForm } from 'components/common';
import i18next from 'i18next';
import { ChangePasswordFormValues, FormField } from 'models';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { showErrorToast } from 'utils/toast';
import { translateFiles } from 'utils/translation';
import * as yup from 'yup';

export interface ChangePasswordFormProps {
  defaultValues: ChangePasswordFormValues;
  onSubmit?: (formValues: ChangePasswordFormValues) => void;
  onForgotPassword?: () => void;
}

export function ChangePasswordForm(props: ChangePasswordFormProps) {
  const { defaultValues, onSubmit, onForgotPassword } = props;

  const { validate, toast: toastTranslation } = translateFiles('validate', 'toast');

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
      toast.success(toastTranslation.changePasswordForm.success);
    } catch (error) {
      showErrorToast(error);
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
