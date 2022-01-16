import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Typography } from '@mui/material';
import { GoogleIcon } from 'components/common';
import { MuiTextField } from 'components/formFields';
import useLoginWithGoogle from 'hooks/useLoginWithGoogle';
import { AuthFormValue } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import { authSchema } from 'utils/schema';

export interface AuthFormProps {
  defaultValues: AuthFormValue;
  switchMode?: () => void;
  onSubmit?: (formValues: AuthFormValue) => void;
}

export default function AuthForm(props: AuthFormProps) {
  const { defaultValues, switchMode, onSubmit } = props;
  const isRegisterMode = defaultValues.mode === 'register';

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(authSchema),
  });

  const googleLogin = useLoginWithGoogle();

  const handleSwitchMode = () => {
    reset();
    switchMode?.();
  };

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
              {isRegisterMode ? 'Đăng ký' : 'Đăng nhập'}
            </Typography>
          </Grid>

          {isRegisterMode && (
            <>
              <MuiTextField
                name="firstName"
                control={control}
                label="Tên"
                variant="outlined"
                size="medium"
                half
              />

              <MuiTextField
                name="lastName"
                control={control}
                label="Họ"
                variant="outlined"
                size="medium"
                half
              />
            </>
          )}

          <MuiTextField
            name="email"
            control={control}
            label="Email"
            variant="outlined"
            size="medium"
          />

          <MuiTextField
            name="password"
            control={control}
            label="Mật khẩu"
            variant="outlined"
            type="password"
            size="medium"
          />

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              {isRegisterMode ? 'Đăng ký' : 'Đăng nhập'}
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
                {isRegisterMode ? 'Đã có tài khoản' : 'Chưa có tài khoản?'}&nbsp;
              </Typography>

              <Typography
                variant="subtitle2"
                component="span"
                color="primary"
                sx={{ cursor: 'pointer' }}
                onClick={handleSwitchMode}
              >
                {isRegisterMode ? 'Đăng nhập' : 'Đăng ký'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
