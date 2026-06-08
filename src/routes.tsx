import { PATH } from '@/constants';
import { RouteObject } from 'react-router-dom';
import { ActiveAccount, UpdatePasswordForm } from './components/auth';
import { Auth } from './components/common';
import { EmptyLayout, HeaderOnlyLayout, LoginLayout, MainLayout } from './components/layouts';
import {
  CreateEditPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  PostDetailPage,
  ProfilePage,
  RegisterPage,
  SavedPage,
  SearchPage,
  SettingsPage,
} from './pages';

const publicRoutes: RouteObject[] = [
  {
    element: <LoginLayout />,
    children: [
      {
        path: PATH.LOGIN,
        element: <LoginPage />,
      },
      {
        path: PATH.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <EmptyLayout maxWidth="sm" />,
    children: [
      {
        path: PATH.ACTIVE,
        element: <ActiveAccount />,
      },
      {
        path: PATH.CREATE_PASSWORD,
        element: <UpdatePasswordForm />,
      },
    ],
  },
];

const privateRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: PATH.HOME,
        element: <HomePage />,
      },
      {
        path: PATH.POST_DETAIL,
        element: <PostDetailPage />,
      },
      {
        path: PATH.SAVED,
        element: <SavedPage />,
      },
    ],
  },
  {
    element: <HeaderOnlyLayout />,
    children: [
      {
        path: PATH.CREATE_POST,
        element: <CreateEditPage />,
      },
      {
        path: PATH.EDIT_POST,
        element: <CreateEditPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    element: <HeaderOnlyLayout maxWidth="md" />,
    children: [
      {
        path: PATH.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: PATH.SETTINGS,
        element: <SettingsPage />,
      },
      {
        path: PATH.SEARCH,
        element: <SearchPage />,
      },
    ],
  },
];

const routes: RouteObject[] = [
  {
    children: publicRoutes,
  },
  {
    element: <Auth />,
    children: privateRoutes,
  },
];

export default routes;
