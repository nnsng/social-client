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
  const isNewPost = !postId;

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const [editedPost, setEditedPost] = useState<any>(null);

  useEffect(() => {
    document.title = isNewPost ? 'Tạo bài viết' : 'Chỉnh sửa bài viết';
  }, [isNewPost]);

  useEffect(() => {
    if (isNewPost) return;

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

  const initialValues: Post = isNewPost
    ? {
        title: '',
        content: '',
        description: '',
        thumbnail: '',
        tags: [],
        authorId: currentUser?._id as string,
      }
    : editedPost;

  const handleFormSubmit = async (formValues: Post) => {
    if (isNewPost) {
      await postApi.create(formValues);
    } else {
      await postApi.update(formValues);
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
            isNewPost={isNewPost}
          />
        )}
      </Box>
    </Container>
  );
}
