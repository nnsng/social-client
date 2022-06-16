import { toast } from 'react-toastify';
import { useTranslateFiles } from './translation';

export const showComingSoonToast = () => {
  const { toast: toastTranslation } = useTranslateFiles('toast');
  toast.info(toastTranslation.comingSoon);
};

export const showErrorToast = (error: any) => {
  const { toast: toastTranslation } = useTranslateFiles('toast');
  const name = error?.response?.data?.name || 'somethingWrong';
  const message = toastTranslation.errors[name];
  toast.error(message);
};
