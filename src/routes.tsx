import { NotFound } from 'components/common';
import Auth from 'features/auth';
import BlogFeature from 'features/blog';
import ProfilePage from 'features/profile';
import SettingFeature from 'features/settings';
import { RouteItem } from 'models';
import { Navigate } from 'react-router-dom';

const ROUTES: RouteItem[] = [
  {
    path: '/',
    element: <Navigate to="/blog" replace={true} />,
  },
  {
    path: '/blog/*',
    element: <BlogFeature />,
    private: true,
  },
  {
    path: '/settings/*',
    element: <SettingFeature />,
    private: true,
  },
  {
    path: '/login',
    element: <Auth mode="login" />,
  },
  {
    path: '/register',
    element: <Auth mode="register" />,
  },
  {
    path: '/active',
    element: <Auth mode="active" />,
  },
  {
    path: '/reset-password',
    element: <Auth mode="resetPassword" />,
  },
  {
    path: '/create-password',
    element: <Auth mode="createPassword" />,
  },
  {
    path: '/user/:username',
    element: <ProfilePage />,
  },
  {
    path: '*',
    element: <NotFound showHeader />,
    private: true,
  },
];

export default ROUTES;
