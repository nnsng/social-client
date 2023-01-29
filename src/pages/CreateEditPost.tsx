import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { postApi } from '~/api';
import { useAppSelector } from '~/app/hooks';
import { CreateEditForm } from '~/components/post';
import { selectCurrentUser } from '~/redux/slices/userSlice';
import { usePageTitle } from '~/hooks';
import { Post } from '~/models';
import { showErrorToastFromServer } from '~/utils/toast';

export function CreateEditPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
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
        navigate('/create');
      }
    })();
  }, [postId, navigate]);

  const defaultValues: Post = isNewPost
    ? {
        title: '',
        content: '',
        thumbnail: '',
        authorId: currentUser?._id as string,
      }
    : editedPost;

  const handleFormSubmit = async (data: Post) => {
    const action = isNewPost ? 'create' : 'update';
    const savedPost = await postApi[action](data);
    navigate(`/post/${savedPost.slug}`);
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
