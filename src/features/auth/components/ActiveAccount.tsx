import { useAppDispatch } from 'app/hooks';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../authSlice';

export interface ActiveAccountProps {
  token: string;
}

export default function ActiveAccount({ token }: ActiveAccountProps) {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authActions.activeAccount({ token, navigate }));
  }, [token]);

  return null;
}
