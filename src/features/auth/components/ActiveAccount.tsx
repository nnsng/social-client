import { useAppDispatch } from 'app/hooks';
import { PageTitle } from 'components/common';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../authSlice';

export interface IActiveAccountProps {
  token: string;
}

export default function ActiveAccount({ token }: IActiveAccountProps) {
  const navigate = useNavigate();

  const { t } = useTranslation('auth');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authActions.activeAccount({ token, navigate }));
  }, [token]);

  return <PageTitle title={t('pageTitle.active')} />;
}
