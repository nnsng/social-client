import { Box, Container } from '@mui/material';
import { Header, NotFound } from 'components/common';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateEditPage, MainPage, PostDetailPage, PostListPage } from './pages';

export default function Blog() {
  return (
    <Box>
      <Header />

      <Box component="main" pt={3}>
        <Container>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="my" element={<PostListPage mode="my" />} />
            <Route path="saved" element={<PostListPage mode="saved" />} />
            <Route path="create" element={<CreateEditPage />} />
            <Route path="edit/:id" element={<CreateEditPage />} />
            <Route path="post/:slug" element={<PostDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}
