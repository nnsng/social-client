import { ToastTypes } from '@/models';
import { toast } from 'react-toastify';
import { translateFiles } from './translation';

export const showToast = (key: string = '', type: ToastTypes = 'success') => {
  const { toast: toastTranslation } = translateFiles('toast');

  const content = key.split('.').reduce((obj, currentKey) => {
    return obj?.[currentKey];
  }, toastTranslation[type]);

  if (!content && type === 'error') {
    return toast.error(toastTranslation.error.somethingWrong);
  }

  toast[type](content);
};

export const showComingSoonToast = () => {
  showToast('comingSoon', 'info');
};
