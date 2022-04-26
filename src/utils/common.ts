import otherApi from 'api/otherApi';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ConfigKey } from 'features/common/configSlice';
import i18next from 'i18next';
import { IPost, IUserConfig } from 'models';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import { CONFIG } from './constants';
import { useTranslateFiles } from './translation';

export const formatTime = (timestamp: any) => {
  dayjs.extend(relativeTime);
  dayjs.locale(i18next.language);
  return dayjs(timestamp).fromNow();
};

export const slugifyString = (str: string) => {
  return slugify(str, { locale: 'vi', lower: true });
};

export const getImageUrlFromCDN = async (image: File) => {
  try {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', '1social');

    const imageObject: any = await otherApi.uploadImageToCDN(formData);
    return imageObject?.url || '';
  } catch (error) {
    console.log('Failed to get image url from cdn:', error);
  }
};

export const copyPostLink = (post: IPost) => {
  const { toast: toastTranslation } = useTranslateFiles('toast');
  navigator.clipboard.writeText(`${window.location.origin}/blog/post/${post.slug}`);
  toast.success(toastTranslation.copyLinkSuccess);
};

export const formatKeyword = (keyword: string) => {
  return keyword.toLowerCase().trim().replace(/\s+/g, '-');
};

export const delay = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const localConfig = {
  set(config: IUserConfig) {
    localStorage.setItem(CONFIG, JSON.stringify(config));
  },
  setProperty(key: ConfigKey, value: string) {
    const prevConfig = JSON.parse(localStorage.getItem(CONFIG) || '{}');
    localStorage.setItem(CONFIG, JSON.stringify({ ...prevConfig, [key]: value }));
  },
  get(key?: ConfigKey) {
    const config = JSON.parse(localStorage.getItem(CONFIG) || '{}');
    if (key) return config?.[key] || '';
    return config;
  },
};

export const showComingSoonToast = () => {
  const { toast: toastTranslation } = useTranslateFiles('toast');
  toast.info(toastTranslation.comingSoon);
};
