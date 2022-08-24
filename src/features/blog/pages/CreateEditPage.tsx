import { Box, Container } from '@mui/material';
import { postApi } from 'api';
import { useAppSelector } from 'app/hooks';
import { PageTitle } from 'components/common';
import { selectCurrentUser } from 'features/auth/userSlice';
import { Post } from 'models';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { showErrorToast } from 'utils/toast';
import CreateEditForm from '../components/CreateEditForm';

export function CreateEditPage() {
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const isNewPost = !postId;

  const { t } = useTranslation('createEditPost');

  const currentUser = useAppSelector(selectCurrentUser);
  const [editedPost, setEditedPost] = useState<any>(null);

  useEffect(() => {
    if (isNewPost) return;

    (async () => {
      try {
        const post = await postApi.getForEdit(postId);
        setEditedPost(post);
      } catch (error) {
        showErrorToast(error);
        navigate('/blog/create', { state: { hideHeaderMenu: true } });
      }
    })();
  }, [postId, navigate]);

  const defaultValues: Post = isNewPost
    ? {
        title: '',
        content: '',
        thumbnail: '',
        hashtags: [],
        authorId: currentUser?._id as string,
      }
    : editedPost;

  const handleFormSubmit = async (data: Post) => {
    const action = isNewPost ? 'create' : 'update';
    const savedPost = await postApi[action](data);
    navigate(`/blog/post/${savedPost.slug}`);
  };

  return (
    <Container>
      <PageTitle title={isNewPost ? t('pageTitle.create') : t('pageTitle.edit')} />

      <Box>
        <CreateEditForm
          defaultValues={defaultValues}
          onSubmit={handleFormSubmit}
          isNewPost={isNewPost}
        />
      </Box>
    </Container>
  );
}
