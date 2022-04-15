import queryString from 'query-string';
import React from 'react';
import { useLocation } from 'react-router-dom';
import ActiveAccount from './components/ActiveAccount';
import FormLayout from './components/FormLayout';

export interface AuthPageProps {
  mode: 'login' | 'register' | 'active';
}

export default function Auth({ mode }: AuthPageProps) {
  const location = useLocation();

  if (mode === 'active') {
    const activeToken = queryString.parse(location.search)?.token as string;
    return <ActiveAccount token={activeToken} />;
  }

  return <FormLayout mode={mode} />;
}
