import { PageTitle } from 'components/common';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import ActiveAccount from './components/ActiveAccount';
import FormLayout from './components/FormLayout';
import queryString from 'query-string';

type AuthMode = 'login' | 'register';

export interface AuthPageProps {
  active?: boolean;
}

export default function Auth({ active }: AuthPageProps) {
  const location = useLocation();
  const activeToken = queryString.parse(location.search).token as string;

  const [mode, setMode] = useState<AuthMode>(location.pathname.slice(1) as AuthMode);

  useEffect(() => {
    if (!active) {
      setMode(location.pathname.slice(1) as AuthMode);
    }
  }, [location.pathname]);

  return active ? <ActiveAccount token={activeToken} /> : <FormLayout mode={mode} />;
}
