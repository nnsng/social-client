import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { MuiTextField } from 'components/formFields';
import { ChangePasswordFormValue } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

export interface ChangePasswordFormProps {
  initialValues: ChangePasswordFormValue;
  onSubmit?: (formValues: ChangePasswordFormValue) => void;
  onForgotPassword?: () => void;
}

const schema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(6, 'Mật khẩu tối thiểu 6 ký tự')
    .required('Vui lòng nhập mật khẩu hiện tại'),
  newPassword: yup
    .string()
    .min(6, 'Mật khẩu tối thiểu 6 ký tự')
    .required('Vui lòng nhập mật khẩu mới'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Mật khẩu nhập lại không khớp'),
});

export default function ChangePasswordForm(props: ChangePasswordFormProps) {
  const { initialValues, onSubmit, onForgotPassword } = props;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: ChangePasswordFormValue) => {
    try {
      await onSubmit?.(formValues);
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
              onClick={onForgotPassword}
            >
              Quên mật khẩu
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
