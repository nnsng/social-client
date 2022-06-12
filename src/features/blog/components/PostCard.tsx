import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { ConfirmDialog } from 'components/common';
import { IPost, PostActionType } from 'models';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import remarkGfm from 'remark-gfm';
import { themeMixins } from 'utils/theme';
import { getErrorMessage } from 'utils/toast';
import { useTranslateFiles } from 'utils/translation';
import PostCardHeader from './PostCardHeader';

export interface IPostCardProps {
  post: IPost;
  onPostAction?: (action: PostActionType, post: IPost) => void;
  showPopup?: boolean;
}

export default function PostCard(props: IPostCardProps) {
  const { post, onPostAction, showPopup = true } = props;

  const { t } = useTranslation('postCard');
  const { toast: toastTranslation, dialog: dialogTranslation } = useTranslateFiles(
    'toast',
    'dialog'
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const closeDialog = () => setOpenDialog(false);

  const handleSavePost = async () => {
    try {
      await onPostAction?.('save', post);
      toast.success(toastTranslation.postCard.saveSuccess);
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleRemovePost = async () => {
    setLoading(true);

    try {
      await onPostAction?.('remove', post);
      toast.success(toastTranslation.postCard.deleteSuccess);
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }

    setLoading(false);
    closeDialog();
  };

  return (
    <>
      <Card
        sx={{
          ...themeMixins.paperBorder(),
          width: '100%',
          p: 2,
          mb: 2,
        }}
      >
        <PostCardHeader
          post={post}
          onSave={handleSavePost}
          onRemove={() => setOpenDialog(true)}
          t={t}
          sx={{
            mb: 1,
            '& .icon-button': {
              mx: 0.5,
            },
          }}
          showPopup={showPopup}
        />

        <CardContent sx={{ '&:last-child': { p: 0 } }}>
          <Stack
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
            }}
          >
            <Box flexGrow={1}>
              <Typography
                color="text.primary"
                fontSize={20}
                fontWeight={600}
                lineHeight={1.2}
                sx={{ ...themeMixins.truncate(2) }}
                component={Link}
                to={`/blog/post/${post.slug}`}
              >
                {post.title}
              </Typography>

              <Typography
                component="div"
                variant="body1"
                color="text.secondary"
                sx={{
                  ...themeMixins.truncate(2),
                  m: 0,
                  mt: 0.5,
                  '& *': { maxWidth: '100%' },
                }}
              >
                <ReactMarkdown
                  children={post.content}
                  remarkPlugins={[remarkGfm]}
                  disallowedElements={['table']}
                />
              </Typography>
            </Box>

            {post.thumbnail && (
              <Box
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  mt: { xs: 2, sm: 0 },
                  ml: { xs: 0, sm: 2 },
                }}
              >
                <CardMedia
                  image={post.thumbnail}
                  title={post.title}
                  sx={{
                    minWidth: 200,
                    aspectRatio: '2',
                    borderRadius: 2,
                    bgcolor: 'action.hover',
                  }}
                  component={Link}
                  to={`/blog/post/${post.slug}`}
                />
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={openDialog}
        onClose={closeDialog}
        title={dialogTranslation.post.delete.title}
        content={dialogTranslation.post.delete.content}
        onConfirm={handleRemovePost}
        loading={loading}
      />
    </>
  );
}
