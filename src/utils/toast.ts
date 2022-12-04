import { ToastTypes } from 'models';
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
  const message = toastTranslation.error[name] || toastTranslation.error[somethingWrong];
  toast.error(message);
};

export const showToast = (key: string, type: ToastTypes = 'success') => {
  const { toast: toastTranslation } = translateFiles('toast');
  const content = key.split('.').reduce((obj, currentKey) => {
    return obj?.[currentKey];
  }, toastTranslation);

  if (!content && type === 'error') {
    return toast.error(toastTranslation.error.somethingWrong);
  }

  toast[type](content);
};
