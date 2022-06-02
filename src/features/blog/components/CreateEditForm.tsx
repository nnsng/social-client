import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useAppSelector } from 'app/hooks';
import {
  FileInputField,
  HashtagInputField,
  InputField,
  MdEditorField,
} from 'components/formFields';
import { selectUploading } from 'features/common/uploadSlice';
import { IPost } from 'models';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { delay } from 'utils/common';
import { themeMixins, themeVariables } from 'utils/theme';
import { useTranslateFiles } from 'utils/translation';
import * as yup from 'yup';

export interface ICreateEditFormProps {
  defaultValues: IPost;
  onSubmit?: (data: IPost) => void;
  isNewPost?: boolean;
}

export default function CreateEditForm(props: ICreateEditFormProps) {
  const { defaultValues, onSubmit, isNewPost } = props;

  const { t } = useTranslation('createEditForm');
  const { validate, toast: toastTranslation } = useTranslateFiles('validate', 'toast');

  const schema = yup.object().shape({
    title: yup.string().required(validate.title.required),
    content: yup.string().required(validate.content.required).min(50, validate.content.min(50)),
    thumbnail: yup.string(),
    hashtags: yup.array().of(
      yup
        .string()
        .min(3, validate.hashtags.min(3))
        .max(20, validate.hashtags.max(20))
        .matches(/^(?![_-])[a-zA-Z0-9-]+(?<![_-])$/, validate.hashtags.valid)
    ),
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const title = watch('title');
  const thumbnail = watch('thumbnail');
  const MAX_HASHTAGS = 5;

  const uploading = useAppSelector(selectUploading);

  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  useEffect(() => {
    (async () => {
      if (isSubmitting) return;

      const hashtagErrors = (errors.hashtags || []).filter((x) => !!x);
      const errorValues: any = Object.values(errors).concat(hashtagErrors);
      if (errorValues?.length === 0) return;

      for (const error of errorValues) {
        toast.error(error.message);
        await delay(200);
      }
    })();
  }, [isSubmitting]);

  const removeThumbnail = () => {
    setValue('thumbnail', '');
  };

  const handleFormSubmit = async (data: IPost) => {
    try {
      await onSubmit?.(data);
    } catch (error) {
      const content = isNewPost
        ? toastTranslation.createEditForm.createError
        : toastTranslation.createEditForm.updateError;
      toast.error(content);
    }
  };

  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <form>
      <Stack
        direction="column"
        height={`calc(100vh - ${themeVariables.headerHeight}px * 2 + 36px)`}
        sx={{
          ...themeMixins.paperBorder(),
        }}
      >
        <Stack alignItems="center" justifyContent="flex-end" px={2}>
          <InputField
            name="title"
            control={control}
            placeholder={t('title.placeholder')}
            spellCheck={false}
            autoFocus
            sx={{
              pt: 2,
              pb: 1,
              fontSize: 28,
              fontWeight: 500,
            }}
          />

          <Button
            variant="outlined"
            size="large"
            onClick={openDialog}
            sx={
              mdUp
                ? { flexShrink: 0, ml: 2 }
                : {
                    position: 'fixed',
                    zIndex: (theme) => theme.zIndex.appBar + 1,
                    top: themeVariables.headerHeight / 2,
                    transform: 'translate(16px, -50%)', // 16px = 2 * 8px (px of Stack parent)
                  }
            }
          >
            {isNewPost ? t('btnLabel.create') : t('btnLabel.edit')}
          </Button>
        </Stack>

        <MdEditorField name="content" control={control} placeholder={t('content.placeholder')} />
      </Stack>

      <Dialog open={open} onClose={closeDialog} fullWidth>
        <Typography
          variant="h6"
          color={title?.length > 0 ? 'text.primary' : 'text.disabled'}
          component="div"
          sx={{
            ...themeMixins.truncate(1),
            py: { xs: 1, sm: 2 },
            px: { xs: 1, sm: 3 },
            fontWeight: 600,
          }}
        >
          {title || `(${t('noTitle')})`}
        </Typography>

        <DialogContent
          dividers
          sx={{
            py: { xs: 1, sm: 2 },
            px: { xs: 1, sm: 3 },
          }}
        >
          <Box
            sx={{
              maxWidth: 400,
              aspectRatio: '2',
              bgcolor: 'action.hover',
              backgroundImage: `url('${thumbnail}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 2,
            }}
          ></Box>

          <Stack alignItems="center" mt={1} mb={2} spacing={1}>
            <Button
              variant="contained"
              size="small"
              component="label"
              htmlFor="thumbnail-input"
              disabled={uploading}
              startIcon={uploading && <CircularProgress size={20} />}
              sx={{ fontWeight: 500 }}
            >
              <FileInputField name="thumbnail" control={control} id="thumbnail-input" />
              {thumbnail ? t('btnLabel.changeThumbnail') : t('btnLabel.addThumbnail')}
            </Button>

            {thumbnail && (
              <Button
                variant="outlined"
                color="error"
                size="small"
                disabled={uploading}
                sx={{ fontWeight: 400 }}
                onClick={removeThumbnail}
              >
                {t('btnLabel.removeThumbnail')}
              </Button>
            )}
          </Stack>

          <HashtagInputField
            name="hashtags"
            control={control}
            max={MAX_HASHTAGS}
            label={t('hashtag.label', { max: MAX_HASHTAGS })}
            placeholder={t('hashtag.placeholder')}
            errorText={t('hashtag.error')}
          />
        </DialogContent>

        <DialogActions sx={{ px: { xs: 1, sm: 2 } }}>
          <Button variant="text" size="large" onClick={closeDialog}>
            {t('btnLabel.cancel')}
          </Button>
          <Button
            variant="contained"
            size="large"
            autoFocus
            disabled={isSubmitting || uploading}
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
