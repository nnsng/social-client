import { yupResolver } from '@hookform/resolvers/yup';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { CommonForm } from '~/components/common';
import { useCustomMediaQuery } from '~/hooks';
import { FormField, User } from '~/models';
import { AvatarField } from './AvatarField';

export interface EditProfileFromProps {
  defaultValues: Partial<User>;
  onSubmit?: (formValues: Partial<User>) => void;
}

export function EditProfileForm(props: EditProfileFromProps) {
  const { defaultValues, onSubmit } = props;

  const { t } = useTranslation('validate');

  const schema = yup.object().shape({
    name: yup
      .string()
      .required(t('required'))
      .max(30, t('max', { max: 30 })),
    avatar: yup.string(),
    username: yup
      .string()
      .required(t('required'))
      .min(6, t('min', { min: 6 }))
      .max(20, t('max', { max: 20 }))
      .matches(/^(?![-.])[a-zA-Z0-9.-]+(?<![-.])$/, t('notAllowed')),
    email: yup.string().email().required(),
    bio: yup.string().max(100, t('max', { max: 100 })),
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { isSubmitting },
  } = useForm<Partial<User>>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const avatarUrl = watch('avatar');

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    clearErrors();
  }, [i18next.language]);

  const removeAvatar = () => setValue('avatar', '');

  const fieldList: FormField[] = [
    {
      name: 'avatar',
    },
    {
      name: 'name',
    },
    {
      name: 'username',
    },
    {
      name: 'email',
      props: {
        disabled: true,
      },
    },
    {
      name: 'bio',
      props: {
        multiline: true,
        rows: 3,
        optional: true,
      },
    },
  ];

  return (
    <CommonForm
      name="editProfileForm"
      fieldList={fieldList}
      control={control}
      submitting={isSubmitting}
      onSubmit={onSubmit && handleSubmit(onSubmit)}
      avatarField={
        <AvatarField
          key="avatar"
          control={control}
          avatarUrl={avatarUrl || ''}
          loading={uploading}
          setLoading={setUploading}
          onRemove={removeAvatar}
        />
      }
    />
  );
}
