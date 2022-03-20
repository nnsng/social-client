import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { MuiTextField } from 'components/formFields';
import { ChangePasswordFormValue } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { passwordSchema } from 'utils/schema';

export interface ChangePasswordFormProps {
  defaultValues: ChangePasswordFormValue;
  onSubmit: (formValues: ChangePasswordFormValue) => void;
  forgotPassword?: () => void;
}

export default function ChangePasswordForm(props: ChangePasswordFormProps) {
  const { defaultValues, onSubmit, forgotPassword } = props;

  const { t } = useTranslation('changePasswordForm');

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(passwordSchema),
  });

  const handleFormSubmit = async (formValues: ChangePasswordFormValue) => {
    try {
      await onSubmit(formValues);
      reset();
      toast.success(t('success'));
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const formControlItems = [
    {
      label: t('label.currentPassword'),
      name: 'currentPassword',
    },
    {
      label: t('label.newPassword'),
      name: 'newPassword',
    },
    {
      label: t('label.confirmPassword'),
      name: 'confirmPassword',
    },
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box pb={3}>
        <Grid container spacing={2}>
          {formControlItems.map(({ label, name }, idx) => (
            <Grid item container alignItems="center" key={idx}>
              <Typography
                variant="h6"
                sx={{
                  width: 240,
                  mb: 0.5,
                  fontSize: 18,
                  fontWeight: 500,
                  userSelect: 'none',
                }}
              >
                {label}
              </Typography>

              <MuiTextField
                name={name}
                control={control}
                type="password"
                variant="outlined"
                placeholder={label}
                sx={{ maxWidth: 400 }}
              />
            </Grid>
          ))}

          <Grid item>
            <Stack direction="row">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                startIcon={isSubmitting && <CircularProgress size={20} />}
              >
                {t('btnLabel.changePassword')}
              </Button>

              <Button
                color="primary"
                size="small"
                sx={{
                  ml: { xs: 2, sm: 3 },
                  ':hover': { bgcolor: 'transparent' },
                }}
                onClick={forgotPassword}
              >
                {t('btnLabel.forgotPassword')}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
