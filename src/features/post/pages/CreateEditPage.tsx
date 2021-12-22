import { Box, Container } from '@mui/material';
import postApi from 'api/postApi';
import { selectCurrentUser } from 'features/auth/authSlice';
import { Post } from 'models';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CreateEditForm from '../components/CreateEditForm';
import { postActions } from '../postSlice';

export function CreateEditPage() {
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const isEditMode = Boolean(postId);

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const [editedPost, setEditedPost] = useState<any>(null);

  useEffect(() => {
    if (!postId) return;

    (async () => {
      try {
        const post = await postApi.getPostForEdit(postId);
        setEditedPost(post);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
        navigate('/blog/create');
      }
    })();
  }, [postId, navigate]);

  const initialValues: Post = {
    title: '',
    content: '',
    description: '',
    thumbnail: '',
    tags: [],
    authorId: currentUser?._id as string,
    ...editedPost,
  };

  const handleFormSubmit = async (formValues: Post) => {
    if (isEditMode) {
      await postApi.update(formValues);
    } else {
      await postApi.create(formValues);
    }

    dispatch(postActions.fetchPostList({}));
    navigate('/blog');
  };

  return (
    <Container maxWidth={false}>
      <Box mt={-4}>
        {currentUser && (
          <CreateEditForm
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            isEditMode={isEditMode}
          />
        )}
      </Box>
    </Container>
  );
}
