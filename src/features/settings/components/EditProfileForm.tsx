import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { FileInputField, MuiTextField } from 'components/formFields';
import { selectUploading } from 'features/common/uploadSlice';
import i18next from 'i18next';
import { IField, IUser } from 'models';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTranslateFiles } from 'utils/translation';
import * as yup from 'yup';

export interface IEditProfileFromProps {
  submitting: boolean;
  defaultValues: Partial<IUser>;
  onSubmit: (formValues: Partial<IUser>) => void;
}

export default function EditProfileFrom(props: IEditProfileFromProps) {
  const { submitting, defaultValues, onSubmit } = props;

  const { t } = useTranslation('editProfileForm');
  const { validate } = useTranslateFiles('validate');

  const schema = yup.object().shape({
    name: yup.string().required(validate.name.required).max(255, validate.name.max(255)),
    avatar: yup.string(),
    username: yup
      .string()
      .required(validate.username.required)
      .min(6, validate.username.min(6))
      .max(50, validate.username.max(20))
      .matches(/^(?![_.])[a-zA-Z0-9._]+(?<![_.])$/, validate.username.valid),
    email: yup.string().email().required(),
    bio: yup.string().max(100, validate.bio.max(100)),
  });

  const { control, handleSubmit, watch, setValue, reset, clearErrors } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const avatarUrl = watch('avatar');

  const uploading = useAppSelector(selectUploading);

  useEffect(() => {
    clearErrors();
  }, [i18next.language]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const removeAvatar = () => {
    setValue('avatar', '');
  };

  const avatarComponent = (
    <Stack direction="column" key="avatar">
      <Typography
        variant="h6"
        sx={{
          width: 160,
          mb: 0.5,
          fontSize: 18,
          fontWeight: 500,
        }}
      >
        {t('label.avatar')}
      </Typography>

      <Stack alignItems="flex-end" spacing={2}>
        <Box
          component="label"
          htmlFor="avatar-upload"
          sx={{
            position: 'relative',
            display: 'inline-block',
            width: 68,
            height: 68,
          }}
        >
          <Avatar
            src={avatarUrl}
            sx={{
              width: '100%',
              height: '100%',
              cursor: 'pointer',
            }}
          />
          <FileInputField name="avatar" control={control} id="avatar-upload" disabled={uploading} />

          {uploading && (
            <Stack
              sx={{
                position: 'absolute',
                inset: '0',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'action.disabled',
                borderRadius: '50%',
              }}
            >
              <CircularProgress size={24} />
            </Stack>
          )}
        </Box>

        {avatarUrl && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={removeAvatar}
            disabled={uploading}
          >
            {t('removeAvatar')}
          </Button>
        )}
      </Stack>
    </Stack>
  );

  const fieldList: IField[] = [
    {
      name: 'name',
      props: {},
    },
    {
      name: 'avatar',
      props: {},
    },
    {
      name: 'username',
      props: {},
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
      },
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Stack direction="column" spacing={2}>
          {fieldList.map(({ name, props }) =>
            name !== 'avatar' ? (
              <MuiTextField
                key={name}
                name={name}
                control={control}
                variant="outlined"
                placeholder={t(`label.${name}`)}
                title={t(`label.${name}`)}
                sx={{ maxWidth: 400 }}
                {...props}
              />
            ) : (
              avatarComponent
            )
          )}

          <Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={submitting || uploading}
              startIcon={submitting && <CircularProgress size={20} />}
            >
              {t('save')}
            </Button>
          </Box>
        </Stack>
      </Box>
    </form>
  );
}
