'use client';

import { useQuery } from '@tanstack/react-query';
import { API } from '../api/index';
import { BLOG_POST } from '../api/constant';
import { Card } from '@divops-packages/ui';

export const DetailsPage = ({ params }: { params: { id: string; body?: { contents: string; createdAt: number } }}) => {
  console.log({ params });

  const category = BLOG_POST;
  const { data } = useQuery(
    ["API.of().readItem", category, params.id, params.body],
    async () => {
      if (params.body == null) {
        return await API.of(category).readItem(params.id as string)
      }

      return params;
    }
  );

  const [title, ...body] = (data ?? {})?.data?.body.contents.trim().split('\n') ?? [];

  return (
    <div>
      <p style={{ fontSize: '8px' }}>{params?.id}</p>
      <h2>{title}</h2>
      <Card>{body}</Card>
    </div>
  )
};
