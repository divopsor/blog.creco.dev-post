import { useGistItem } from '@divops-packages/blog-creco-dev';
import { BLOG_POST } from '../constants';

export function usePost(id: string) {
  return useGistItem(BLOG_POST, id);
}
