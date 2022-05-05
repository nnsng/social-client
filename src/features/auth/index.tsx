import queryString from 'query-string';
import React from 'react';
import { useLocation } from 'react-router-dom';
import ActiveAccount from './components/ActiveAccount';
import AuthLayout from './components/AuthLayout';
import { NewPassword } from './components/NewPassword';

export interface AuthPageProps {
  mode: 'login' | 'register' | 'active' | 'password';
}

export default function Auth({ mode }: AuthPageProps) {
  const location = useLocation();
  const activeToken = queryString.parse(location.search)?.token as string;

  switch (mode) {
    case 'login':
    case 'register': {
      return <AuthLayout mode={mode} />;
    }

    case 'active': {
      return <ActiveAccount token={activeToken} />;
    }

    case 'password': {
      return <NewPassword token={activeToken} />;
    }

    default: {
      return null;
    }
  }
}
