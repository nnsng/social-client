import { ActiveAccount, UpdatePasswordForm } from './components/auth';
import { NotFound } from './components/common';
import { AuthLayout, HeaderOnlyLayout, MainLayout } from './components/layouts';
import { RouteItem } from './models';
import {
  CreateEditPage,
  HomePage,
  LoginPage,
  PostDetailPage,
  ProfilePage,
  RegisterPage,
  SavedPage,
  SettingsPage,
} from './pages';

export const publicRoutes: RouteItem[] = [
  {
    path: '/login',
    component: LoginPage,
    layout: AuthLayout,
  },
  {
    path: '/register',
    component: RegisterPage,
    layout: AuthLayout,
  },
  {
    path: '/active',
    component: ActiveAccount,
  },
  {
    path: '/password',
    component: UpdatePasswordForm,
  },
];

export const privateRoutes: RouteItem[] = [
  {
    path: '/',
    component: HomePage,
    layout: MainLayout,
  },
  {
    path: '/create',
    component: CreateEditPage,
    layout: HeaderOnlyLayout,
  },
  {
    path: '/create/:postId',
    component: CreateEditPage,
    layout: HeaderOnlyLayout,
  },
  {
    path: '/post/:slug',
    component: PostDetailPage,
    layout: MainLayout,
  },
  {
    path: '/saved',
    component: SavedPage,
    layout: MainLayout,
  },
  {
    path: '/profile/:username',
    component: ProfilePage,
    layout: HeaderOnlyLayout,
    layoutProps: {
      maxWidth: 'md',
    },
  },
  {
    path: '/settings',
    component: SettingsPage,
    layout: HeaderOnlyLayout,
    layoutProps: {
      maxWidth: 'md',
    },
  },
  {
    path: '*',
    component: NotFound,
    layout: HeaderOnlyLayout,
  },
];
