import { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

interface CustomScrollbarProps {
  children?: ReactNode;
}

export function CustomScrollbar({ children }: CustomScrollbarProps) {
  const location = useLocation();

  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current.scrollTop = 0;
  }, [location]);

  return (
    <SimpleBar scrollableNodeProps={{ ref }} style={{ height: '100vh' }}>
      {children}
    </SimpleBar>
  );
}
