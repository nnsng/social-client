import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Typography } from '@mui/material';
import { GoogleIcon } from 'components/common';
import { MuiTextField } from 'components/formFields';
import useLoginWithGoogle from 'hooks/useLoginWithGoogle';
import { AuthFormValue } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface AuthFormProps {
  initialValues: AuthFormValue;
  registerMode: boolean;
  switchMode?: () => void;
  onSubmit?: (formValues: AuthFormValue) => void;
}

const getSchema = (registerMode: boolean) =>
  yup.object().shape({
    email: yup.string().email('Email không hợp lệ.').required('Vui lòng nhập email.'),
    password: yup
      .string()
      .min(6, 'Mật khẩu tối thiểu 6 ký tự.')
      .required('Vui lòng nhập password.'),
    firstName: registerMode
      ? yup.string().required('Vui lòng nhập tên.')
      : yup.string().notRequired(),
    lastName: registerMode
      ? yup.string().required('Vui lòng nhập họ.')
      : yup.string().notRequired(),
  });

export default function AuthForm(props: AuthFormProps) {
  const { initialValues, registerMode, switchMode, onSubmit } = props;

  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(getSchema(registerMode)),
  });

  const googleLogin = useLoginWithGoogle();

  const handleFormSubmit = (formValues: AuthFormValue) => {
    onSubmit?.(formValues);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box
        sx={{
          width: '100%',
          maxWidth: 450,
          py: 5,
          px: 4,
          bgcolor: 'background.default',
          borderRadius: 3,
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              color="primary"
              mb={2}
              fontSize={48}
              fontWeight="600"
              textAlign="center"
              sx={{ userSelect: 'none' }}
            >
              {registerMode ? 'Đăng ký' : 'Đăng nhập'}
            </Typography>
          </Grid>

          {registerMode && (
            <>
              <MuiTextField
                name="firstName"
                control={control}
                label="Tên"
                variant="outlined"
                size="medium"
                half
                spellCheck={false}
              />

              <MuiTextField
                name="lastName"
                control={control}
                label="Họ"
                variant="outlined"
                size="medium"
                half
                spellCheck={false}
              />
            </>
          )}

          <MuiTextField
            name="email"
            control={control}
            label="Email"
            variant="outlined"
            size="medium"
            spellCheck={false}
          />

          <MuiTextField
            name="password"
            control={control}
            label="Mật khẩu"
            variant="outlined"
            type="password"
            size="medium"
            spellCheck={false}
          />

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              {registerMode ? 'Đăng ký' : 'Đăng nhập'}
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              fullWidth
              startIcon={<GoogleIcon width={24} height={24} />}
              onClick={googleLogin}
            >
              Tiếp tục với Google
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Box textAlign="center" sx={{ userSelect: 'none' }}>
              <Typography variant="subtitle2" component="span" sx={{ cursor: 'default' }}>
                {registerMode ? 'Đã có tài khoản' : 'Chưa có tài khoản?'}&nbsp;
              </Typography>

              <Typography
                variant="subtitle2"
                component="span"
                color="primary"
                sx={{ cursor: 'pointer' }}
                onClick={switchMode}
              >
                {registerMode ? 'Đăng nhập' : 'Đăng ký'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
