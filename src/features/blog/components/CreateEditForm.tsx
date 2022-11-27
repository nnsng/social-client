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
import {
  FileInputField,
  HashtagInputField,
  InputField,
  MdEditorField,
} from 'components/formFields';
import { Post } from 'models';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { delay } from 'utils/common';
import { themeMixins, themeVariables } from 'utils/theme';
import { showErrorToast } from 'utils/toast';
import { translateFiles } from 'utils/translation';
import * as yup from 'yup';

export interface CreateEditFormProps {
  defaultValues: Post;
  onSubmit?: (data: Post) => void;
  isNewPost?: boolean;
}

export function CreateEditForm(props: CreateEditFormProps) {
  const { defaultValues, onSubmit, isNewPost } = props;

  const { t } = useTranslation('createEditForm');
  const { validate } = translateFiles('validate', 'toast');

  const schema = yup.object().shape({
    title: yup.string().required(validate.title.required).max(100, validate.title.max(100)),
    content: yup.string().required(validate.content.required),
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

  const [uploading, setUploading] = useState(false);
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

  const handleFormSubmit = async (formValues: Post) => {
    try {
      await onSubmit?.(formValues);
    } catch (error) {
      showErrorToast(error);
    }
  };

  const smUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'));
  const dialogWidth = smUp ? { fullWidth: true } : { fullScreen: true };

  return (
    <Box component="form">
      <Stack
        direction="column"
        sx={{
          ...themeMixins.paperBorder(),
          height: `calc(100vh - ${themeVariables.headerHeight}px * 2 + 36px)`,
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
              fontSize: { xs: 20, sm: 28 },
              fontWeight: 500,
            }}
          />

          <Button
            variant="outlined"
            size={smUp ? 'large' : 'medium'}
            sx={
              smUp
                ? { flexShrink: 0, ml: 2 }
                : {
                    position: 'fixed',
                    zIndex: (theme) => theme.zIndex.appBar + 1,
                    top: themeVariables.headerHeight / 2,
                    transform: 'translate(16px, -50%)', // 16px = 2 * 8px (px of Stack parent)
                  }
            }
            onClick={openDialog}
          >
            {isNewPost ? t('btnLabel.create') : t('btnLabel.edit')}
          </Button>
        </Stack>

        <MdEditorField name="content" control={control} placeholder={t('content.placeholder')} />
      </Stack>

      <Dialog open={open} onClose={closeDialog} {...dialogWidth}>
        <Typography
          color={title?.length > 0 ? 'text.primary' : 'text.disabled'}
          fontSize={{ xs: 16, sm: 18 }}
          fontWeight={600}
          sx={{
            ...themeMixins.truncate(1),
            py: { xs: 1, sm: 2 },
            px: { xs: 1, sm: 3 },
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
          {thumbnail && (
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
          )}

          <Stack alignItems="center" mt={1} mb={2} spacing={1}>
            <Button
              variant="contained"
              size="small"
              component="label"
              htmlFor="thumbnail-input"
              disabled={uploading}
              startIcon={uploading && <CircularProgress size={18} />}
              sx={{
                fontSize: 12,
                fontWeight: 400,
              }}
            >
              <FileInputField
                name="thumbnail"
                control={control}
                id="thumbnail-input"
                setUploading={setUploading}
              />
              {thumbnail ? t('btnLabel.changeThumbnail') : t('btnLabel.addThumbnail')}
            </Button>

            {thumbnail && (
              <Button
                variant="outlined"
                color="error"
                size="small"
                disabled={uploading}
                onClick={removeThumbnail}
                sx={{
                  fontSize: 12,
                  fontWeight: 400,
                }}
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
          <Button variant="text" size={smUp ? 'large' : 'medium'} onClick={closeDialog}>
            {t('btnLabel.cancel')}
          </Button>
          <Button
            variant="contained"
            size={smUp ? 'large' : 'medium'}
            autoFocus
            disabled={isSubmitting || uploading}
            startIcon={isSubmitting && <CircularProgress size={20} />}
            onClick={handleSubmit(handleFormSubmit)}
          >
            {isNewPost ? t('btnLabel.create') : t('btnLabel.edit')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
