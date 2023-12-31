import { useGistList } from '@divops-packages/blog-creco-dev';
import { CATEGORY } from '../constants';
import { parsePost } from '../utils';

export function usePosts(initialList: any) {
  return (useGistList(CATEGORY) ?? initialList).map(parsePost) as ReturnType<typeof parsePost>[];
}