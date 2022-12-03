import { APP_NAME } from 'constants/common';
import { useEffect } from 'react';

export function usePageTitle(title: string, showAppName?: boolean) {
  useEffect(() => {
    document.title = showAppName ? `${title} | ${APP_NAME}` : title;
  });
}
