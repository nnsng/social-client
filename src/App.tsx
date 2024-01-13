import { Route, RouteObject, Routes } from 'react-router-dom';
import { CustomScrollbar } from '~/components/common';
import { SocketClient } from './components/socket';
import { useInitApp } from './hooks/common';
import routes from './routes';

const createElementsFromRoutes = (routes: RouteObject[]) => {
  return routes.map(({ path, element, children }, index) => (
    <Route key={`${path}-${index}`} path={path} element={element}>
      {children ? createElementsFromRoutes(children) : null}
    </Route>
  ));
};

function App() {
  useInitApp();

  return (
    <CustomScrollbar>
      <SocketClient />
      <Routes>{createElementsFromRoutes(routes)}</Routes>
    </CustomScrollbar>
  );
}

export default App;
