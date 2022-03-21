import i18n from 'i18next';
import cdnApi from 'api/cdnApi';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Post } from 'models';
import slugify from 'slugify';

export const formatTime = (timestamp: any) => {
  dayjs.extend(relativeTime);
  dayjs.locale(i18n.language);
  return dayjs(timestamp).fromNow();
};

export const slugifyString = (str: string) => slugify(str, { locale: 'vi', lower: true });

export const uploadImage = async (image: File) => {
  try {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'cdn_test');

    const imageObject: { [key: string]: any } = await cdnApi.getImageUrl(formData);
    return imageObject?.url;
  } catch (error) {
    console.log('Failed to get image url from cdn:', error);
  }
};

export const copyPostLink = (post: Post) => {
  navigator.clipboard.writeText(`${window.location.origin}/blog/${post.slug}`);
};
