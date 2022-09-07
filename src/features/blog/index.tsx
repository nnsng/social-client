import { Box } from '@mui/material';
import { Header, NotFound } from 'components/common';
import { Route, Routes } from 'react-router-dom';
import { CreateEditPage, MainPage, MySavedPage, PostDetailPage } from './pages';

export default function BlogFeature() {
  return (
    <Box>
      <Header />

      <Box component="main">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="saved" element={<MySavedPage />} />
          <Route path="create" element={<CreateEditPage />} />
          <Route path="edit/:id" element={<CreateEditPage />} />
          <Route path="post/:slug" element={<PostDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
  );
}
