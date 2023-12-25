'use client';

import { useQuery } from '@tanstack/react-query';
import { API } from '../api/index';
import { BLOG_POST } from '../api/constant';
import { Card } from '@divops-packages/ui';

export const DetailsPage = ({ params }: { params: { id: string }}) => {
  const category = BLOG_POST;
  const { data } = useQuery(
    ["API.of().readItem", category, params.id],
    () => API.of(category).readItem(params.id as string)
  );

  const [title, ...body] = (data ?? {})?.data?.body.contents.trim().split('\n') ?? [];

  return (
    <div>
      <h2>{title}</h2>
      <Card>{body}</Card>
    </div>
  )
};
