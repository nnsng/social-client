import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useAppSelector } from 'app/hooks';
import {
  FileInputField,
  InputField,
  MdEditorField,
  KeywordInputField,
} from 'components/formFields';
import { selectCdnLoading } from 'features/cdn/cdnSlice';
import { Post } from 'models';
import React, { useEffect, useState } from 'react';
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
    formState: { isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(postSchema),
  });

  const thumbnail = watch('thumbnail');
  const maxKeywords = 5;

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
            <Button variant="outlined" size="large" onClick={handleClickOpen}>
              {isNewPost ? t('btnLabel.create') : t('btnLabel.edit')}
            </Button>
          </Grid>
        </Grid>

        <MdEditorField name="content" control={control} placeholder={t('placeholder.content')} />
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        sx={(theme) => ({
          '& .MuiPaper-root': {
            width: 800,
          },
          '& .MuiTypography-h6': {
            padding: theme.spacing(1, 3),
          },
          '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
          },
        })}
      >
        <Typography variant="h6" component="div" sx={{ ...mixins.truncate(1) }}>
          {getValues('title')}
        </Typography>

        <DialogContent dividers>
          <Box
            sx={{
              maxWidth: 400,
              height: 200,
              bgcolor: 'grey.200',
              backgroundImage: `url('${thumbnail}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 2,
            }}
          ></Box>

          <Stack direction="row" alignItems="center" mt={1} mb={2} spacing={1}>
            <Button
              variant="outlined"
              size="small"
              component="label"
              htmlFor="thumbnail-input"
              disabled={imageLoading}
              startIcon={imageLoading && <CircularProgress size={20} />}
              sx={{ fontWeight: 400 }}
            >
              <FileInputField name="thumbnail" control={control} id="thumbnail-input" />
              {t('btnLabel.addThumbnail')}
            </Button>

            {thumbnail && (
              <Button
                variant="outlined"
                color="error"
                size="small"
                disabled={imageLoading}
                sx={{ fontWeight: 400 }}
                onClick={handleRemoveThumbnail}
              >
                {t('btnLabel.removeThumbnail')}
              </Button>
            )}
          </Stack>

          <KeywordInputField
            name="keywords"
            control={control}
            maxKeywords={maxKeywords}
            placeholder={t('placeholder.keyword', { maxKeywords })}
            maxKeywordsError={t('placeholder.maxKeywordsError', { maxKeywords })}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="text" size="large" onClick={handleClose}>
            {t('btnLabel.cancel')}
          </Button>
          <Button
            variant="contained"
            size="large"
            autoFocus
            disabled={isSubmitting || imageLoading}
            startIcon={isSubmitting && <CircularProgress size={20} />}
            onClick={handleSubmit(handleFormSubmit)}
          >
            {isNewPost ? t('btnLabel.create') : t('btnLabel.edit')}
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
