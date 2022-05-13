import { toast } from 'react-toastify';
import { useTranslateFiles } from './translation';

export const showComingSoonToast = () => {
  const { toast: toastTranslation } = useTranslateFiles('toast');
  toast.info(toastTranslation.comingSoon);
};

export const getErrorMessage = (error: any) => {
  const { toast: toastTranslation } = useTranslateFiles('toast');
  const errorName = error?.response?.data?.name || 'somethingWrong';
  return toastTranslation.errors[errorName];
};
