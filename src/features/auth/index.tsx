import { NotFound, PrivateRoute } from '~/components/common';
import queryString from 'query-string';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ActiveAccount, UpdatePasswordForm } from './components';
import { LoginPage, RegisterPage } from './pages';

export default function AuthFeature() {
  const location = useLocation();
  const activeToken = queryString.parse(location.search)?.token as string;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/active" element={<ActiveAccount token={activeToken} />} />

      <Route path="/update-password" element={<UpdatePasswordForm token={activeToken} />} />

      <Route
        path="*"
        element={
          <PrivateRoute>
            <NotFound />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
