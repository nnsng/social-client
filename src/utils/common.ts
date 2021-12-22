import cdnApi from 'api/cdnApi';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Post } from 'models';
import slugify from 'slugify';

dayjs.extend(relativeTime);
dayjs.locale('vi');

export function formatTime(timestamp: any) {
  return dayjs(timestamp).fromNow();
}

export function removeVietnameseTones(str: string) {
  return slugify(str, { locale: 'vi', lower: true });
}

export async function getImageUrl(image: File) {
  try {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'cdn_test');

    const imageObject: any = await cdnApi.getImageUrl(formData);
    return imageObject?.url;
  } catch (error) {
    console.log('Failed to get image url from cdn:', error);
  }
}

export function copyPostLink(post: Post) {
  navigator.clipboard.writeText(`${window.location.href}/post/${post.slug}`);
}
