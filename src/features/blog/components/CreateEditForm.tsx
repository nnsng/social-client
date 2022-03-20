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
import { useAppSelector } from 'app/hooks';
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
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { postSchema } from 'utils/schema';
import { mixins, themeConstants } from 'utils/theme';

export interface CreateEditFormProps {
  defaultValues: Post;
  onSubmit?: (data: Post) => void;
  isNewPost?: boolean;
}

const Transition = forwardRef(
  (props: TransitionProps & { children: ReactElement }, ref: Ref<unknown>) => {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

export default function CreateEditForm(props: CreateEditFormProps) {
  const { defaultValues, onSubmit, isNewPost } = props;

  const { t } = useTranslation('createEditForm');

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(postSchema),
  });

  const watchThumbnail = watch('thumbnail');

  const imageLoading = useAppSelector(selectCdnLoading);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    reset(defaultValues);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const handleRemoveThumbnail = () => {
    setValue('thumbnail', '');
  };

  const handleFormSubmit = async (data: Post) => {
    try {
      await onSubmit?.(data);
    } catch (error) {
      const content = isNewPost ? t('error.create') : t('error.edit');
      toast.error(content);
    }
  };

  const hasError = Object.keys(errors).length > 0;

  return (
    <form>
      <Box height={`calc(100vh - ${themeConstants.headerHeight} * 2 - 24px)`} mt={1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <InputField
              name="title"
              control={control}
              placeholder={t('placeholder.title')}
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
              {isNewPost ? t('btnLabel.create') : t('btnLabel.edit')}
            </Button>
          </Grid>
        </Grid>

        <MdEditorField name="content" control={control} placeholder={t('placeholder.content')} />
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
                ...mixins.truncate(1),
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
              {isNewPost ? t('btnLabel.create') : t('btnLabel.edit')}
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
                  title={t('label.description')}
                  placeholder={t('placeholder.description')}
                  multiline
                  rows={5}
                />

                <TagInputField
                  name="tags"
                  control={control}
                  maxTags={5}
                  editable
                  placeholder={t('placeholder.tag')}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="subtitle1" mb={0.5}>
                    {t('label.thumbnail')}
                  </Typography>

                  <Box
                    sx={{
                      maxWidth: 400,
                      height: 200,
                      bgcolor: 'grey.200',
                      backgroundImage: `url('${watchThumbnail}')`,
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
                      {t('btnLabel.selectImage')}
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      size="medium"
                      disabled={imageLoading}
                      sx={{
                        ml: 2,
                        fontWeight: 400,
                      }}
                      onClick={handleRemoveThumbnail}
                    >
                      {t('btnLabel.deleteImage')}
                    </Button>
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
