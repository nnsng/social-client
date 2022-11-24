import { Box } from '@mui/material';
import { Header } from 'components/common';
import { Route, Routes } from 'react-router-dom';
import ROUTES from './routes';

export default function BlogFeature() {
  return (
    <Box>
      <Header />

      <Box component="main">
        <Routes>
          {ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Box>
    </Box>
  );
}
