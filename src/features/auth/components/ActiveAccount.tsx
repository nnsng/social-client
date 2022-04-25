import { useAppDispatch } from 'app/hooks';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../authSlice';

export interface IActiveAccountProps {
  token: string;
}

export default function ActiveAccount({ token }: IActiveAccountProps) {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authActions.activeAccount({ token, navigate }));
  }, [token]);

  return null;
}
