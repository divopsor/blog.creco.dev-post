'use client';

import { Card } from '@divops-packages/ui';
import { useQuery } from '@tanstack/react-query';
import { BLOG_POST } from '../../pages/api/constant';
import { API } from '../../pages/api/gist';

// export const FastDetailsPage = ({ post }: { post?: { id: string; body: { contents: string; createdAt: number; }}}) => {
//   const [title, ...body] = post?.body.contents.trim().split('\n') ?? [];

//   return (
//     <div>
//       <p style={{ fontSize: '8px' }}>{post?.id}</p>
//       <h2>{title}</h2>
//       <Card>{body}</Card>
//     </div>
//   )
// }

export const DetailsPage = ({ post }: { post?: { id: string; body: { contents: string; createdAt: number; }}}) => {
  const category = BLOG_POST;
  const { data } = useQuery(
    ["API.of().readItem", category, post?.id, post?.body],
    async () => {
      if (post?.body == null) {
        return await API.of(category).readItem(post?.id as string)
      }

      return post;
    },
    {
      initialData: post,
    }
  );

  const [title, ...body] = (data ?? {})?.data?.body.contents.trim().split('\n') ?? [];

  return (
    <div>
      <p style={{ fontSize: '8px' }}>{post?.id}</p>
      <h2>{title}</h2>
      <Card>{body}</Card>
    </div>
  )
};

// export const DetailsPage = ({ post }: { post?: { id: string; body: { contents: string; createdAt: number; }}}) => {
//   return <SlowDetailsPage post={post} />
// }