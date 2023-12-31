import { useGistList } from '@divops-packages/blog-creco-dev';
import { BLOG_POST } from '../constants';
import { parsePost } from '../utils';

export function usePosts(initialPosts: any) {
  return (useGistList(BLOG_POST) ?? initialPosts).map(parsePost) as ReturnType<typeof parsePost>[];
}