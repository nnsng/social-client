import { postApi } from '@/api';
import { CreateEditForm } from '@/components/post';
import { PATH } from '@/constants';
import { usePageTitle } from '@/hooks';
import { Post, type PostFormValues } from '@/models';
import { useAppSelector } from '@/store/hooks';
import { selectCurrentUser } from '@/store/slices/userSlice';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, generatePath } from 'react-router-dom';

export function CreateEditPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const isNewPost = !postId;

  const { t } = useTranslation('createEditPage');

  const currentUser = useAppSelector(selectCurrentUser);
  const [editedPost, setEditedPost] = useState<Post | {}>({});

  usePageTitle(isNewPost ? t('pageTitle.create') : t('pageTitle.edit'));

  useEffect(() => {
    if (isNewPost) return;

    (async () => {
      try {
        const post = await postApi.getForEdit(postId);
        setEditedPost(post);
      } catch (error) {
        navigate(PATH.CREATE_POST);
      }
    })();
  }, [postId, navigate]);

  const defaultValues: Post = {
    title: '',
    content: '',
    thumbnail: '',
    authorId: currentUser?._id!,
    description: '',
    ...editedPost,
  };
  const handleFormSubmit = async (data: PostFormValues) => {
    const action = isNewPost ? 'create' : 'update';
    const savedPost = await postApi[action](data);
    navigate(generatePath(PATH.POST_DETAIL, { slug: savedPost.slug }));
  };

  return (
    <CreateEditForm
      defaultValues={defaultValues}
      onSubmit={handleFormSubmit}
      isNewPost={isNewPost}
    />
  );
}
