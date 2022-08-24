import { useEffect } from 'react';

export interface PageTitleProps {
  title: string;
}

export function PageTitle({ title }: PageTitleProps) {
  useEffect(() => {
    document.title = title;
  });

  return null;
}
