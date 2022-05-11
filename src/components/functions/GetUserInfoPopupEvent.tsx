import { useState } from 'react';

export interface IGetUserInfoPopupEventProps {
  setOpenPopup: (open: boolean) => void;
}

export function GetUserInfoPopupEvent({ setOpenPopup }: IGetUserInfoPopupEventProps) {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>();

  const onMouseEnter = () => {
    const id = setTimeout(() => {
      setOpenPopup(true);
    }, 500);
    setTimeoutId(id);
  };

  const onMouseLeave = () => {
    timeoutId && clearTimeout(timeoutId);
    setTimeoutId(undefined);
    setOpenPopup(false);
  };

  return { onMouseEnter, onMouseLeave };
}
