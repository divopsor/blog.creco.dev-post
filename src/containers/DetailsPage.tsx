import { useQuery } from '@tanstack/react-query';
import { GistAPI, Post, ResponsivePage, withMD2HTML, Colors, Spacing } from '@divops-packages/blog-creco-dev';
import { BLOG_POST } from '../constants';

export const DetailsPage = ({ post }: { post?: { id: string; body: { contents: string; createdAt: number; updatedAt: number }}}) => {
  const { data } = useQuery(
    ["API.of().readItem", BLOG_POST, post?.id],
    async () => await GistAPI.of({ category: BLOG_POST }).readItem(post?.id as string),
    { initialData: null }
  );
  const details = (data ?? {})?.data ?? post;

  const [category, title, ...body] = details?.body.contents.trim().split('\n') ?? [];
  const date = new Date(details?.body.updatedAt ?? details?.body.createdAt);

  return (
    <ResponsivePage
      mainBackgroundColor={Colors.Dark}
      subBackgroundColor={Colors.DeepDark}
      fontColor={Colors.SoftWhite}
      desktopPageWidth="840px"
    >
      <h4>{category}</h4>
      <p style={{ fontSize: '10px', color: Colors.DeepDark }}>{post?.id}</p>
      <p>{date.toLocaleString('ko-KR')}</p>
      <h2 style={{ textDecoration: 'underline', wordBreak: 'keep-all' }}>{title}</h2>
      <Spacing size={20} />

      <Post dangerouslySetInnerHTML={{ __html: withMD2HTML(body.join('\n')) }} />
    </ResponsivePage>
  )
};
