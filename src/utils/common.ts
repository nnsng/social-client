import cdnApi from 'api/cdnApi';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ConfigKey } from 'features/common/configSlice';
import i18next from 'i18next';
import { Post, UserConfig } from 'models';
import slugify from 'slugify';
import { CONFIG } from './constants';

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

    const imageObject: any = await cdnApi.getImageUrl(formData);
    return imageObject?.url || '';
  } catch (error) {
    console.log('Failed to get image url from cdn:', error);
  }
};

export const copyPostLink = (post: Post) => {
  navigator.clipboard.writeText(`${window.location.origin}/blog/${post.slug}`);
};

export const localConfig = {
  set(config: UserConfig) {
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
