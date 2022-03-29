import { useEffect } from 'react';

export interface ITitleProps {
  title: string;
}

export function PageTitle({ title }: ITitleProps) {
  useEffect(() => {
    document.title = title;
  });

  return null;
}
