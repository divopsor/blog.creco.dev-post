import { useGistItem } from '@divops-packages/blog-creco-dev';
import { CATEGORY } from '../constants';

export function usePost(id: string) {
  return useGistItem(CATEGORY, id);
}
