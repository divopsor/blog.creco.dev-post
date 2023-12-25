import { Card } from '@divops-packages/ui';
import { useQuery } from '@tanstack/react-query';
import { BLOG_POST } from '../../pages/api/constant';
import { API } from '../../pages/api/gist';

export const DetailsPage = ({ post }: { post?: { id: string; body: { contents: string; createdAt: number; }}}) => {
  const category = BLOG_POST;
  const { data } = useQuery(
    ["API.of().readItem", category, post?.id],
    async () => await API.of(category).readItem(post?.id as string),
    { initialData: null }
  );

  const [title, ...body] = ((data ?? {})?.data ?? post)?.body.contents.trim().split('\n') ?? [];

  return (
    <div>
      <p style={{ fontSize: '8px' }}>{post?.id}</p>
      <h2>{title}</h2>
      <Card>{body}</Card>
    </div>
  )
};
