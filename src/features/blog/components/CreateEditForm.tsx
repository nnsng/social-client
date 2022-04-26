import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from '@mui/material';
import { useAppSelector } from 'app/hooks';
import {
  FileInputField,
  InputField,
  KeywordInputField,
  MdEditorField,
} from 'components/formFields';
import { selectUploading } from 'features/common/uploadSlice';
import { IPost } from 'models';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { delay } from 'utils/common';
import { mixins, themeVariables } from 'utils/theme';
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
    keywords: yup.array().of(
      yup
        .string()
        .min(3, validate.keywords.min(3))
        .max(20, validate.keywords.max(20))
        .matches(/^(?![_-])[a-zA-Z0-9-]+(?<![_-])$/, validate.keywords.valid)
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
  const maxKeyword = 5;

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

      const keywordErrors = (errors.keywords || []).filter((x) => !!x);
      const errorValues: any = Object.values(errors).concat(keywordErrors);
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

  return (
    <form>
      <Stack
        direction="column"
        height={`calc(100vh - ${themeVariables.headerHeight} * 2 + 36px)`}
        sx={{
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Stack alignItems="center" spacing={1} px={2}>
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

          <Button variant="outlined" size="large" onClick={openDialog} sx={{ flexShrink: 0 }}>
            {isNewPost ? t('btnLabel.create') : t('btnLabel.edit')}
          </Button>
        </Stack>

        <MdEditorField name="content" control={control} placeholder={t('content.placeholder')} />
      </Stack>

      <Dialog
        open={open}
        onClose={closeDialog}
        sx={{
          '& .MuiPaper-root': {
            width: 800,
          },
        }}
      >
        <Typography
          variant="h6"
          color={title?.length > 0 ? 'text.primary' : 'text.disabled'}
          component="div"
          sx={{
            px: 3,
            py: 2,
            fontWeight: 600,
            ...mixins.truncate(1),
          }}
        >
          {title || t('noTitle')}
        </Typography>

        <DialogContent dividers>
          <Box
            sx={{
              maxWidth: 400,
              height: 200,
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
              {t('btnLabel.addThumbnail')}
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

          <KeywordInputField
            name="keywords"
            control={control}
            max={maxKeyword}
            label={t('keyword.label', { max: maxKeyword })}
            placeholder={t('keyword.placeholder')}
            errorText={t('keyword.error')}
          />
        </DialogContent>

        <DialogActions sx={{ px: 2 }}>
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
