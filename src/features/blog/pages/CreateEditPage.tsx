import { Box } from '@mui/material';
import { postApi } from 'api';
import { useAppSelector } from '~/app/hooks';
import { selectCurrentUser } from '~/features/auth/userSlice';
import { usePageTitle } from '~/hooks';
import { Post } from '~/models';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { showErrorToastFromServer } from '~/utils/toast';
import { CreateEditForm } from '../components';

export function CreateEditPage() {
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const isNewPost = !postId;

  const { t } = useTranslation('createEditPage');

  const currentUser = useAppSelector(selectCurrentUser);
  const [editedPost, setEditedPost] = useState<any>(null);

  usePageTitle(isNewPost ? t('pageTitle.create') : t('pageTitle.edit'));

  useEffect(() => {
    if (isNewPost) return;

    (async () => {
      try {
        const post = await postApi.getForEdit(postId);
        setEditedPost(post);
      } catch (error) {
        showErrorToastFromServer(error);
        navigate('/blog/create');
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
    <Box>
      <CreateEditForm
        defaultValues={defaultValues}
        onSubmit={handleFormSubmit}
        isNewPost={isNewPost}
      />
    </Box>
  );
}
