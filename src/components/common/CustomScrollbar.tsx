import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

export interface ICustomScrollbarProps {
  children?: React.ReactNode;
}

export function CustomScrollbar({ children }: ICustomScrollbarProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return <SimpleBar style={{ maxHeight: '100vh' }}>{children}</SimpleBar>;
}
