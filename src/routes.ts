import { HeaderOnlyLayout, MainLayout } from './components/layouts';
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

export const privateRoutes = [
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
  },
  {
    path: '/settings',
    component: SettingsPage,
    layout: HeaderOnlyLayout,
  },
];

export const publicRoutes = [
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/register',
    component: RegisterPage,
  },
  {
    path: '/active',
    component: RegisterPage,
  },
  {
    path: '/password',
    component: RegisterPage,
  },
];
