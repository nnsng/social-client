import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { MuiTextField } from 'components/formFields';
import { ChangePasswordFormValue } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { passwordSchema } from 'utils';

export interface ChangePasswordFormProps {
  initialValues: ChangePasswordFormValue;
  onSubmit: (formValues: ChangePasswordFormValue) => void;
  forgotPassword?: () => void;
}

export default function ChangePasswordForm(props: ChangePasswordFormProps) {
  const { initialValues, onSubmit, forgotPassword } = props;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(passwordSchema),
  });

  const handleFormSubmit = async (formValues: ChangePasswordFormValue) => {
    try {
      await onSubmit(formValues);
      reset();
      toast.success('Đổi mật khẩu thành công');
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const formControlItems = [
    {
      label: 'Mật khẩu hiện tại',
      name: 'currentPassword',
    },
    {
      label: 'Mật khẩu mới',
      name: 'newPassword',
    },
    {
      label: 'Nhập lại mật khẩu mới',
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
                fontSize={18}
                fontWeight="500"
                mb={0.5}
                width={240}
                sx={{ userSelect: 'none' }}
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              startIcon={isSubmitting && <CircularProgress size={20} />}
            >
              Đổi mật khẩu
            </Button>

            <Button
              color="primary"
              sx={{ ml: 3, ':hover': { bgcolor: 'transparent' } }}
              onClick={forgotPassword}
            >
              Quên mật khẩu
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
