import { Card } from '@divops-packages/ui';
import { useQuery } from '@tanstack/react-query';
import { HTMLAttributes } from 'react';
import { BLOG_POST } from '../../pages/api/constant';
import { API } from '../../pages/api/gist';
import { Page } from '../components/Page';
import { Spacing } from '../components/Spacing';
import { Colors } from '../constants';

export const DetailsPage = ({ post }: { post?: { id: string; body: { contents: string; createdAt: number; }}}) => {
  const category = BLOG_POST;
  const { data } = useQuery(
    ["API.of().readItem", category, post?.id],
    async () => await API.of(category).readItem(post?.id as string),
    { initialData: null }
  );

  const [title, ...body] = ((data ?? {})?.data ?? post)?.body.contents.trim().split('\n') ?? [];

  return (
    <Page>
      <p style={{ fontSize: '10px', color: Colors.SoftGrey }}>{post?.id}</p>
      <h2>{title}</h2>
      <Spacing size={20} />

      <Post>{body}</Post>
    </Page>
  )
};

const Post = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      style={{
        fontSize: '1.6rem',
        ...props.style,
      }}
    />
  )
}