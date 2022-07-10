import { SxProps, Theme } from '@mui/material';
import { UserInfoPopup } from 'components/common';
import { IUser } from 'models';
import { useEffect, useRef, useState } from 'react';

export interface IUseUserInfoPopup {
  user: Partial<IUser>;
  anchorEl: any;
}

export function useUserInfoPopup(props: IUseUserInfoPopup) {
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return onMouseLeave;
  }, []);

  const onMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenPopup(true);
    }, 500);
  };

  const onMouseLeave = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    setOpenPopup(false);
  };

  const userInfoPopupComponent = UserInfoPopup({ open: openPopup, ...props });

  return {
    userInfoPopupComponent,
    mouseEvents: { onMouseEnter, onMouseLeave },
  };
}
