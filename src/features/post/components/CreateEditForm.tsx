import { yupResolver } from '@hookform/resolvers/yup';
import { CloseRounded } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import {
  FileInputField,
  InputField,
  MdEditorField,
  MuiTextField,
  TagInputField,
} from 'components/formFields';
import { selectCdnLoading } from 'features/cdn/cdnSlice';
import { Post } from 'models';
import React, { forwardRef, ReactElement, Ref, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from 'app/hooks';
import { toast } from 'react-toastify';
import { themeConstants, themeMixins } from 'styles/theme';
import * as yup from 'yup';

export interface CreateEditFormProps {
  initialValues: Post;
  onSubmit?: (formValues: Post) => void;
  isNewPost?: boolean;
}

const Transition = forwardRef(
  (props: TransitionProps & { children: ReactElement }, ref: Ref<unknown>) => {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

const schema = yup.object().shape({
  title: yup.string().required('Vui lòng nhập tiêu đề'),
  content: yup.string().min(5, 'Nội dung tối thiểu 500 ký tự').required('Vui lòng nhập nội dung'),
  description: yup.string(),
  thumbnail: yup.string(),
  tags: yup.array().of(yup.object().shape({ name: yup.string(), value: yup.string() })),
});

export default function CreateEditForm(props: CreateEditFormProps) {
  const { initialValues, onSubmit, isNewPost } = props;

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const imageLoading = useAppSelector(selectCdnLoading);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    reset(initialValues);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const handleFormSubmit = async (formValues: Post) => {
    try {
      await onSubmit?.(formValues);
    } catch (error) {
      const content = isNewPost ? 'Đăng bài thất bại' : 'Cập nhật bài viết thất bại';
      toast.error(content);
    }
  };

  const hasError = Object.keys(errors).length > 0;

  return (
    <form>
      <Box height={`calc(100vh - ${themeConstants.headerHeight * 2}px - 24px)`} mt={1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <InputField
              name="title"
              control={control}
              placeholder="Tiêu đề"
              spellCheck={false}
              autoFocus
              sx={{
                pt: 2,
                pb: 1,
                fontSize: 28,
                fontWeight: 500,
              }}
            />
          </Grid>

          <Grid item xs="auto" ml={2}>
            <Button variant="outlined" color="primary" size="large" onClick={handleClickOpen}>
              {isNewPost ? 'Đăng bài' : 'Cập nhật'}
            </Button>
          </Grid>
        </Grid>

        <MdEditorField name="content" control={control} placeholder="Nhập nội dung bài viết..." />
      </Box>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            height: themeConstants.headerHeight,
            backgroundColor: 'background.default',
            boxShadow: themeConstants.boxShadow,
          }}
        >
          <Toolbar sx={{ height: '100%', display: 'flex' }}>
            <IconButton edge="start" color="inherit" sx={{ flexShrink: 0 }} onClick={handleClose}>
              <CloseRounded />
            </IconButton>

            <Typography
              variant="h6"
              component="div"
              sx={{
                ...themeMixins.truncate(1),
                flexGrow: 1,
                ml: 2,
              }}
            >
              {getValues('title')}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="large"
              autoFocus
              disabled={isSubmitting || imageLoading || hasError}
              startIcon={isSubmitting && <CircularProgress size={20} />}
              sx={{ flexShrink: 0 }}
              onClick={handleSubmit(handleFormSubmit)}
            >
              {isNewPost ? 'Đăng bài' : 'Cập nhật'}
            </Button>
          </Toolbar>
        </Box>

        <Box position="relative" py={5}>
          <Container maxWidth="md">
            <Grid container spacing={6}>
              <Grid item container xs={12} md={6} spacing={4}>
                <MuiTextField
                  name="description"
                  control={control}
                  variant="outlined"
                  title="Thêm mô tả cho bài viết (tuỳ chọn):"
                  placeholder="Nhập mô tả..."
                  multiline
                  rows={5}
                />

                <TagInputField
                  name="tags"
                  control={control}
                  maxTags={5}
                  editable
                  placeholder="Ví dụ: Front-end, Back-end,..."
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="subtitle1" mb={0.5}>
                    Thêm thumbnail cho bài viết:
                  </Typography>

                  <Box
                    sx={{
                      maxWidth: 400,
                      height: 200,
                      bgcolor: 'grey.200',
                      backgroundImage: `url('${getValues('thumbnail')}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: 2,
                    }}
                  ></Box>

                  <Box display="flex" alignItems="center" mt={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      component="label"
                      htmlFor="thumbnail-input"
                      disabled={imageLoading}
                      startIcon={imageLoading && <CircularProgress size={20} />}
                      sx={{ fontWeight: 400 }}
                    >
                      <FileInputField name="thumbnail" control={control} id="thumbnail-input" />
                      Chọn ảnh
                    </Button>

                    {/* <Button
                      variant="outlined"
                      color="error"
                      size="medium"
                      sx={{
                        ml: 2,
                        fontWeight: 400,
                      }}
                      onClick={handleRemoveThumbnail}
                    >
                      Xóa ảnh
                    </Button> */}
                  </Box>
                </Box>

                {hasError && (
                  <Alert severity="error" sx={{ maxWidth: 400, mt: 1 }}>
                    {Object.values(errors)[0].message}
                  </Alert>
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Dialog>
    </form>
  );
}
