import { useEffect } from 'react';

export interface IPageTitleProps {
  title: string;
}

export function PageTitle({ title }: IPageTitleProps) {
  useEffect(() => {
    document.title = title;
  });

  return null;
}
