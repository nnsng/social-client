import { yupResolver } from '@hookform/resolvers/yup';
import { CommonForm } from '~/components/common';
import i18next from 'i18next';
import { FormField, User } from '~/models';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
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
      .required(t('name.required'))
      .max(30, t('name.max', { max: 30 })),
    avatar: yup.string(),
    username: yup
      .string()
      .required(t('username.required'))
      .min(6, t('username.min', { min: 6 }))
      .max(20, t('username.max', { max: 20 }))
      .matches(/^(?![-.])[a-zA-Z0-9.-]+(?<![-.])$/, t('username.valid')),
    email: yup.string().email().required(),
    bio: yup.string().max(100, t('bio.max', { max: 100 })),
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
      name: 'name',
    },
    {
      name: 'avatar',
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
        sx: {
          '& .MuiInputBase-root': {
            borderRadius: 4,
          },
        },
      },
    },
  ];

  return (
    <CommonForm
      name="editProfileForm"
      fieldList={fieldList}
      control={control}
      onSubmit={onSubmit && handleSubmit(onSubmit)}
      submitting={isSubmitting}
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
