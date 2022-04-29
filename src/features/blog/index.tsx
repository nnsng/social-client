import { Box } from '@mui/material';
import { Header, NotFound } from 'components/common';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateEditPage, MainPage, MyPostListPage, PostDetailPage } from './pages';

export default function Blog() {
  return (
    <Box>
      <Header />

      <Box component="main" pt={2}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="my" element={<MyPostListPage mode="my" />} />
          <Route path="saved" element={<MyPostListPage mode="saved" />} />
          <Route path="create" element={<CreateEditPage />} />
          <Route path="edit/:id" element={<CreateEditPage />} />
          <Route path="post/:slug" element={<PostDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
  );
}
