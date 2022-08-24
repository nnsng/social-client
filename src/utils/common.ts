import { otherApi } from 'api';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
import i18next from 'i18next';
import { Post } from 'models';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import { showErrorToast } from './toast';
import { translateFiles } from './translation';

export const formatTime = (timestamp: any, template?: string) => {
  dayjs.extend(relativeTime);
  dayjs.locale(i18next.language);
  return template ? dayjs(timestamp).format(template) : dayjs(timestamp).fromNow();
};

export const slugifyString = (str: string) => {
  return slugify(str, { locale: 'vi', lower: true });
};

export const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
};

export const getImageUrlFromCDN = async (image: File) => {
  try {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', '1social');

    const imageObject: any = await otherApi.uploadImageToCDN(formData);
    return imageObject?.url || '';
  } catch (error) {
    showErrorToast(error);
  }
};

export const copyPostLink = (post: Post) => {
  const { toast: toastTranslation } = translateFiles('toast');
  navigator.clipboard.writeText(`${window.location.origin}/blog/post/${post.slug}`);
  toast.success(toastTranslation.copyLinkSuccess);
};

export const formatHashtag = (hashtag: string) => {
  return hashtag.toLowerCase().trim().replace(/\s+/g, '-');
};

export const delay = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.toLowerCase().match(re);
};
