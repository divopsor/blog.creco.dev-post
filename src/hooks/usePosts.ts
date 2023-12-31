import { useGistList } from '@divops-packages/blog-creco-dev';
import { CATEGORY } from '../constants';
import { parsePost } from '../utils';

export function usePosts(initialPosts: any) {
  return (useGistList(CATEGORY) ?? initialPosts).map(parsePost) as ReturnType<typeof parsePost>[];
}