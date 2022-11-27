import { APP_NAME } from 'constants/common';
import { useEffect } from 'react';

export interface PageTitleProps {
  title?: string;
}

export function PageTitle({ title }: PageTitleProps) {
  useEffect(() => {
    document.title = title ?? APP_NAME;
  });

  return null;
}
