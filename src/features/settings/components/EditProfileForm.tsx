import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { FileInputField, MuiTextField } from 'components/formFields';
import i18next from 'i18next';
import { FormField, User } from 'models';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { translateFiles } from 'utils/translation';
import * as yup from 'yup';

export interface EditProfileFromProps {
  submitting: boolean;
  defaultValues: Partial<User>;
  onSubmit: (formValues: Partial<User>) => void;
}

export function EditProfileForm(props: EditProfileFromProps) {
  const { submitting, defaultValues, onSubmit } = props;

  const { t } = useTranslation('editProfileForm');
  const { validate } = translateFiles('validate');

  const schema = yup.object().shape({
    name: yup.string().required(validate.name.required).max(30, validate.name.max(30)),
    avatar: yup.string(),
    username: yup
      .string()
      .required(validate.username.required)
      .min(6, validate.username.min(6))
      .max(20, validate.username.max(20))
      .matches(/^(?![-.])[a-zA-Z0-9.-]+(?<![-.])$/, validate.username.valid),
    email: yup.string().email().required(),
    bio: yup.string().max(100, validate.bio.max(100)),
  });

  const { control, handleSubmit, watch, setValue, clearErrors } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const avatarUrl = watch('avatar');

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    clearErrors();
  }, [i18next.language]);

  const removeAvatar = () => {
    setValue('avatar', '');
  };

  const avatarComponent = (
    <Stack direction="column" key="avatar">
      <Typography
        fontSize={{ xs: 14, sm: 16 }}
        fontWeight={500}
        sx={{
          width: 160,
          mb: 0.5,
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
            width: { xs: 56, sm: 68 },
            height: { xs: 56, sm: 68 },
          }}
        >
          <Avatar
            src={avatarUrl}
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              '&:hover::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                bgcolor: 'common.black',
                opacity: 0.3,
              },
            }}
          />
          <FileInputField
            name="avatar"
            control={control}
            id="avatar-upload"
            disabled={uploading}
            setUploading={setUploading}
          />

          {uploading && (
            <Stack
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                inset: '0',
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
            disabled={uploading}
            onClick={removeAvatar}
          >
            {t('removeAvatar')}
          </Button>
        )}
      </Stack>
    </Stack>
  );

  const fieldList: FormField[] = [
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
        sx: {
          maxWidth: 400,
          '& .MuiInputBase-root': {
            borderRadius: 4,
          },
        },
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
                rounded
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
              sx={{ borderRadius: 40, fontSize: 13 }}
            >
              {t('save')}
            </Button>
          </Box>
        </Stack>
      </Box>
    </form>
  );
}
