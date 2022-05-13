import {
  ChatBubbleOutlineRounded,
  FavoriteBorderRounded,
  VisibilityOutlined,
} from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { ConfirmDialog } from 'components/common';
import { IPost } from 'models';
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
  onSave?: (post: IPost) => void;
  onRemove?: (post: IPost) => void;
  showPopup?: boolean;
}

export default function PostCard(props: IPostCardProps) {
  const { post, onSave, onRemove, showPopup = true } = props;

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
      await onSave?.(post);
      toast.success(toastTranslation.postCard.saveSuccess);
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleRemovePost = async () => {
    setLoading(true);

    try {
      await onRemove?.(post);
      toast.success(toastTranslation.postCard.deleteSuccess);
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }

    setLoading(false);
    closeDialog();
  };

  const statistics = [
    {
      icon: <FavoriteBorderRounded />,
      count: post.statistics?.likeCount || 0,
    },
    {
      icon: <ChatBubbleOutlineRounded />,
      count: post.statistics?.commentCount || 0,
    },
    {
      icon: <VisibilityOutlined />,
      count: post.statistics?.viewCount || 0,
    },
  ];

  return (
    <>
      <Card
        sx={{
          width: '100%',
          p: 2,
          mb: 2,
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider',
        }}
      >
        <PostCardHeader
          post={post}
          onSavePost={handleSavePost}
          onRemovePost={() => setOpenDialog(true)}
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
                variant="h6"
                color="text.primary"
                sx={{
                  ...themeMixins.truncate(2),
                  fontWeight: 600,
                }}
                component={Link}
                to={`/blog/post/${post.slug}`}
              >
                {post.title}
              </Typography>

              <Typography
                variant="body1"
                component="div"
                color="text.secondary"
                sx={{
                  ...themeMixins.truncate(2),
                  m: 0,
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
                    maxWidth: { xs: 400, sm: 200 },
                    width: { xs: '100%', sm: 200 },
                    height: { xs: 200, sm: 100 },
                    borderRadius: 2,
                    bgcolor: 'action.hover',
                  }}
                  component={Link}
                  to={`/blog/post/${post.slug}`}
                />
              </Box>
            )}
          </Stack>

          <Stack mt={{ xs: 2, sm: 1 }}>
            {statistics.map(({ icon, count }, idx) => (
              <Typography
                key={idx}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'text.secondary',
                  fontSize: 14,
                  mr: 2,
                  '& svg': {
                    mr: 1,
                  },
                }}
              >
                {icon}
                {count}
              </Typography>
            ))}
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
