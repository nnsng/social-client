import { NotFound } from 'components/common';
import { RouteItem } from 'models';
import { CreateEditPage, MainPage, MySavedPage, PostDetailPage } from './pages';

const ROUTES: RouteItem[] = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: 'saved',
    element: <MySavedPage />,
  },
  {
    path: 'create',
    element: <CreateEditPage />,
  },
  {
    path: 'edit/:id',
    element: <CreateEditPage />,
  },
  {
    path: 'post/:slug',
    element: <PostDetailPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default ROUTES;
