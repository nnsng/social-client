import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { ConfirmDialog } from 'components/common';
import { Post } from 'models';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import remarkGfm from 'remark-gfm';
import { themeMixins } from 'utils/theme';
import { showErrorToast } from 'utils/toast';
import { translateFiles } from 'utils/translation';
import PostCardHeader from './PostCardHeader';

const allowedElements = [
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'blockquote',
  'ul',
  'ol',
  'li',
  'strong',
  'em',
  'code',
  'a',
  'span',
];

export interface PostCardProps {
  post: Post;
  onSave?: (post: Post) => void;
  onDelete?: (post: Post) => void;
  showPopup?: boolean;
}

export default function PostCard(props: PostCardProps) {
  const { post, onSave, onDelete, showPopup = true } = props;

  const { toast: toastTranslation, dialog: dialogTranslation } = translateFiles('toast', 'dialog');

  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  // prevent click on anchor tag
  useEffect(() => {
    const anchorTags = document.querySelectorAll('.post-content a');
    [...anchorTags].forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
      });
    });
  }, []);

  const closeDialog = () => setOpenDialog(false);

  const handleSavePost = async () => {
    try {
      await onSave?.(post);
      toast.success(toastTranslation.postCard.saveSuccess);
    } catch (error) {
      showErrorToast(error);
    }
  };

  const handleRemovePost = async () => {
    setLoading(true);

    try {
      await onDelete?.(post);
      toast.success(toastTranslation.postCard.deleteSuccess);
    } catch (error) {
      showErrorToast(error);
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
          showPopup={showPopup}
          sx={{
            mb: 1,
            '& .icon-button': {
              mx: 0.5,
            },
          }}
        />

        <CardContent sx={{ '&:last-child': { p: 0 } }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
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
                className="post-content"
                sx={{
                  ...themeMixins.truncate(2),
                  m: 0,
                  mt: 0.5,
                  '& *': {
                    maxWidth: '100%',
                    color: 'text.secondary',
                    fontSize: 16,
                    fontWeight: 400,
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    cursor: 'text',
                  },
                }}
              >
                <ReactMarkdown
                  children={post.content}
                  remarkPlugins={[remarkGfm]}
                  allowedElements={allowedElements}
                />
              </Typography>
            </Box>

            {post.thumbnail && (
              <Box width={{ xs: '100%', sm: 'auto' }} mt={{ xs: 2, sm: 0 }} ml={{ xs: 0, sm: 2 }}>
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
