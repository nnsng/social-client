import { ToastTypes } from '~/models';
import { toast } from 'react-toastify';
import { translateFiles } from './translation';

export const showToast = (key: string, type: ToastTypes = 'success', message?: string) => {
  const { toast: toastTranslation } = translateFiles('toast');

  const content = key.split('.').reduce((obj, currentKey) => {
    return obj?.[currentKey];
  }, toastTranslation[type]);

  if (!content && type === 'error') {
    return toast.error(message ?? toastTranslation.error.somethingWrong);
  }

  toast[type](content);
};

export const showComingSoonToast = () => {
  showToast('comingSoon', 'info');
};

export const showErrorToastFromServer = (error: any) => {
  const key = error?.response?.data?.name;
  const message = error?.response?.data?.message;
  showToast(key, 'error', message);
};
