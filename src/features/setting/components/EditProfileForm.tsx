import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { FileInputField, MuiTextField } from 'components/formFields';
import { selectCdnLoading } from 'features/cdn/cdnSlice';
import { User } from 'models';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { profileSchema } from 'utils/schema';
export interface EditProfileFromProps {
  submitting: boolean;
  defaultValues: User;
  onSubmit: (formValues: User) => void;
}

export default function EditProfileFrom(props: EditProfileFromProps) {
  const { submitting, defaultValues, onSubmit } = props;

  const { control, handleSubmit, getValues, reset } = useForm({
    defaultValues,
    resolver: yupResolver(profileSchema),
  });

  const imageLoading = useAppSelector(selectCdnLoading);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box pb={3}>
        <Grid container spacing={2}>
          <Grid item container alignItems="center">
            <Typography
              variant="h6"
              fontSize={18}
              fontWeight="500"
              mb={0.5}
              width={160}
              sx={{ userSelect: 'none' }}
            >
              Họ tên
            </Typography>

            <MuiTextField
              name="name"
              control={control}
              variant="outlined"
              placeholder="Họ tên"
              sx={{ maxWidth: 400 }}
            />
          </Grid>

          <Grid item container alignItems="center">
            <Typography
              variant="h6"
              fontSize={18}
              fontWeight="500"
              mb={0.5}
              width={160}
              sx={{ userSelect: 'none' }}
            >
              Ảnh đại diện
            </Typography>

            <Grid item xs={12}>
              <Box
                component="label"
                htmlFor="avatar-upload"
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                }}
              >
                <Avatar
                  src={getValues('avatar')}
                  sx={{ width: 68, height: 68, cursor: 'pointer' }}
                />
                <FileInputField name="avatar" control={control} id="avatar-upload" />

                {imageLoading && (
                  <Stack
                    sx={{
                      position: 'absolute',
                      inset: '0',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'rgba(0, 0, 0, 0.3)',
                      borderRadius: '50%',
                    }}
                  >
                    <CircularProgress size={24} />
                  </Stack>
                )}
              </Box>
            </Grid>
          </Grid>

          <Grid item container alignItems="center">
            <Typography
              variant="h6"
              fontSize={18}
              fontWeight="500"
              mb={0.5}
              width={160}
              sx={{ userSelect: 'none' }}
            >
              Tên người dùng
            </Typography>

            <MuiTextField
              name="username"
              control={control}
              variant="outlined"
              placeholder="Username"
              sx={{ maxWidth: 400 }}
            />
          </Grid>

          <Grid item container alignItems="center">
            <Typography
              variant="h6"
              fontSize={18}
              fontWeight="500"
              mb={0.5}
              width={160}
              sx={{ userSelect: 'none' }}
            >
              Email
            </Typography>

            <MuiTextField
              name="email"
              control={control}
              variant="outlined"
              placeholder="Email"
              sx={{ maxWidth: 400 }}
              disabled
            />
          </Grid>

          <Grid item container alignItems="center">
            <Typography
              variant="h6"
              fontSize={18}
              fontWeight="500"
              mb={0.5}
              width={160}
              sx={{ userSelect: 'none' }}
            >
              Số điện thoại
            </Typography>

            <MuiTextField
              name="phone"
              control={control}
              variant="outlined"
              placeholder="Số điện thoại"
              sx={{ maxWidth: 400 }}
            />
          </Grid>

          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={submitting || imageLoading}
              startIcon={submitting && <CircularProgress size={20} />}
            >
              Lưu thay đổi
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
