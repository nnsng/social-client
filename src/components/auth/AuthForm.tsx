import images from '@/assets/images';
import { MuiTextField } from '@/components/formFields';
import { APP_NAME } from '@/constants';
import { FormField, LoginFormValues, RegisterFormValues } from '@/models';
import { Avatar, Box, CircularProgress, Stack, Typography } from '@mui/material';
import { FormEventHandler } from 'react';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AuthButton } from './AuthButton';

export interface AuthFormProps {
  name: 'login' | 'register';
  control: Control<LoginFormValues> | Control<RegisterFormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  fieldList: FormField[];
  submitting: boolean;
  onGoogleLogin?: () => void;
}

export function AuthForm(props: AuthFormProps) {
  const { name: formName, control, onSubmit, fieldList, submitting, onGoogleLogin } = props;

  const { t } = useTranslation(`${formName}Page`);

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Stack direction="column" alignItems="center" justifyContent="center">
        <Avatar
          sx={{
            width: 48,
            height: 48,
            fontSize: 32,
            fontWeight: 600,
            bgcolor: 'primary.main',
            color: 'common.white',
            mb: 2,
          }}
        >
          {APP_NAME[0]}
        </Avatar>

        <Typography color="text.primary" fontSize={24} fontWeight={600}>
          {t('form.title', { appName: APP_NAME })}
        </Typography>
      </Stack>

      <Stack direction="column" spacing={1} mt={4}>
        {fieldList.map(({ name, props }) => (
          <MuiTextField
            key={name}
            name={name}
            control={control}
            label={t(`form.label.${name}`)}
            variant="outlined"
            size="medium"
            disabled={submitting}
            sx={{
              '& input': {
                py: 1.5,
                fontSize: 16,
              },
              '& fieldset': {
                fontSize: 16,
              },
            }}
            {...props}
          />
        ))}

        <AuthButton
          type="submit"
          variant="contained"
          disabled={submitting}
          startIcon={submitting && <CircularProgress size={20} />}
          sx={{ fontSize: 16 }}
        >
          {t('form.button.submit')}
        </AuthButton>

        {onGoogleLogin && (
          <AuthButton
            variant="outlined"
            startIcon={<img src={images.google} width={24} />}
            onClick={onGoogleLogin}
          >
            {t('form.button.google')}
          </AuthButton>
        )}
      </Stack>
    </Box>
  );
}
