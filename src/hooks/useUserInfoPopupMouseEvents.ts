import { useEffect, useRef } from 'react';

export interface IUseUserInfoPopupMouseEventsProps {
  setOpenPopup: (open: boolean) => void;
}

export function useUserInfoPopupMouseEvents({ setOpenPopup }: IUseUserInfoPopupMouseEventsProps) {
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

  return { onMouseEnter, onMouseLeave };
}
