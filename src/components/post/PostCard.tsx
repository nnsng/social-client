import {
  BookmarkRounded,
  BorderColorRounded,
  DeleteRounded,
  FlagRounded,
  LinkRounded,
} from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import remarkGfm from 'remark-gfm';
import { useAppSelector } from '~/app/hooks';
import { ConfirmDialog } from '~/components/common';
import { ROLE } from '~/constants';
import { selectCurrentUser } from '~/redux/slices/userSlice';
import { MenuOption, Post } from '~/models';
import { copyPostLink } from '~/utils/common';
import { themeMixins } from '~/utils/theme';
import { showComingSoonToast, showErrorToastFromServer } from '~/utils/toast';
import { translateFiles } from '~/utils/translation';
import { PostCardHeader } from './PostCardHeader';

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

export function PostCard(props: PostCardProps) {
  const { post, onSave, onDelete, showPopup = true } = props;

  const navigate = useNavigate();

  const { t } = useTranslation('postMenu');
  const { toast: toastTranslation } = translateFiles('toast');

  const currentUser = useAppSelector(selectCurrentUser);

  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

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
      showErrorToastFromServer(error);
    }
  };

  const handleRemovePost = async () => {
    setLoading(true);

    try {
      await onDelete?.(post);
      toast.success(toastTranslation.postCard.deleteSuccess);
    } catch (error) {
      showErrorToastFromServer(error);
    }

    setLoading(false);
    closeDialog();
  };

  const isAuthor = post.authorId === currentUser?._id;
  const isAdmin = currentUser?.role === ROLE.ADMIN;

  const actionMenu: MenuOption[] = [
    {
      label: t('save'),
      icon: BookmarkRounded,
      onClick: handleSavePost,
      show: true,
    },
    {
      label: t('edit'),
      icon: BorderColorRounded,
      onClick: () => navigate?.(`/edit/${post._id}`),
      show: isAuthor,
    },
    {
      label: t('delete'),
      icon: DeleteRounded,
      onClick: () => setOpenDialog(true),
      show: isAuthor || isAdmin,
    },
    {
      label: t('copyLink'),
      icon: LinkRounded,
      onClick: () => copyPostLink(post),
      show: true,
    },
    {
      label: t('report'),
      icon: FlagRounded,
      onClick: showComingSoonToast,
      show: !isAuthor,
    },
  ];

  return (
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
        actionMenu={actionMenu}
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
              to={`/post/${post.slug}`}
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
                to={`/post/${post.slug}`}
              />
            </Box>
          )}
        </Stack>
      </CardContent>

      <ConfirmDialog
        type="post.delete"
        open={openDialog}
        onClose={closeDialog}
        onConfirm={handleRemovePost}
        loading={loading}
      />
    </Card>
  );
}
