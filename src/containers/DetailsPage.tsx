import { useQuery } from '@tanstack/react-query';
import { HTMLAttributes } from 'react';
import { BLOG_POST } from '../../pages/api/constant';
import { API } from '../../pages/api/gist';
import { Page } from '../components/Page';
import { Spacing } from '../components/Spacing';
import { Colors } from '../constants';

export const DetailsPage = ({ post }: { post?: { id: string; body: { contents: string; createdAt: number; updatedAt: number }}}) => {
  const category = BLOG_POST;
  const { data } = useQuery(
    ["API.of().readItem", category, post?.id],
    async () => await API.of(category).readItem(post?.id as string),
    { initialData: null }
  );
  const details = (data ?? {})?.data ?? post;

  const [title, ...body] = details?.body.contents.trim().split('\n') ?? [];
  const date = new Date(details?.body.updatedAt ?? details?.body.createdAt);

  return (
    <Page>
      <p style={{ fontSize: '10px', color: Colors.DeepDark }}>{post?.id}</p>
      <p>{date.toLocaleString('ko-KR', { timeZone: 'UTC' })}</p>
      <h2 style={{ textDecoration: 'underline' }}>{title}</h2>
      <Spacing size={20} />

      <Post dangerouslySetInnerHTML={{ __html: withConvertor(body) }} />
    </Page>
  )
};

function withConvertor(body: string[]) {
  const result: string[] = [];

  for (let token of body) {
    if (token.startsWith('https://') && token.endsWith('.jpg')) {
      const images = token.split(',');

      result.push(`
        <div style="text-align: center; display: flex; width: 100%; justify-content: space-evenly; flex-wrap: wrap; gap: 20px;">
          ${images.map(x => `<img src="${x}" style="max-height: 400px; max-width: 100%" />`).join('')}
        </div>
      `);
    } else {
      const pattern = /!?\[([^\]]*)\]\(([^\)]+)\)/gm;

      const matches = [...token.matchAll(pattern) as any];

      for (const match of matches) {
        token = token.replace(match[0], `<a style="color: skyblue" href="${match[2]}" target="_blank">${match[1]}</a>`);
      }

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