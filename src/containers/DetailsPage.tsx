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
      <p style={{ fontSize: '10px', color: Colors.DeepDark }}>{post?.id}</p>
      <h2 style={{ textDecoration: 'underline' }}>{title}</h2>
      <Spacing size={20} />

      <Post dangerouslySetInnerHTML={{ __html: withConvertor(body) }} />
    </Page>
  )
};

function withConvertor(body: string[]) {
  const result: string[] = [];

  for (const token of body) {
    if (token.startsWith('https://') && token.endsWith('.jpg')) {
      result.push(`<div style="text-align: center"><img src="${token}" style="max-height: 700px; max-width: 100%" /></div>`);
    } else {
      result.push(token);
    }
  }

  return result.join('\n')
}

const Post = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={props.className == null ? `Post` : `Post ${props.className}`}
      style={{
        fontSize: '1.6rem',
        whiteSpace: 'pre-wrap',
        wordBreak: 'keep-all',
        ...props.style,
      }}
    />
  )
}