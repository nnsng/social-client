import { toast } from 'react-toastify';
import { translateFiles } from './translation';

export const showComingSoonToast = () => {
  const { toast: toastTranslation } = translateFiles('toast');
  toast.info(toastTranslation.comingSoon);
};

export const showErrorToast = (error: any) => {
  const { toast: toastTranslation } = translateFiles('toast');
  const somethingWrong = 'somethingWrong';
  const name = error?.response?.data?.name || somethingWrong;
  const message = toastTranslation.errors[name] || toastTranslation.errors[somethingWrong];
  toast.error(message);
};
