import { MainLayout } from '~/components/layouts';
import { Route, Routes } from 'react-router-dom';
import { CreateEditPage, HomePage, PostDetailPage, SavedPage } from './pages';

export default function BlogFeature() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="saved" element={<SavedPage />} />

        <Route path="create" element={<CreateEditPage />} />

        <Route path="edit/:id" element={<CreateEditPage />} />

        <Route path="post/:slug" element={<PostDetailPage />} />
      </Routes>
    </MainLayout>
  );
}
