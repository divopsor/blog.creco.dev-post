import { useQuery } from '@tanstack/react-query';
import { GistAPI, Post, ResponsivePage, withMD2HTML, Colors, Spacing } from '@divops-packages/blog-creco-dev';
import { BLOG_POST } from '../constants';
import { parsePost } from '../utils';

export const DetailsPage = ({ post }: { post?: { id: string; body?: { contents: string; createdAt: number; updatedAt: number }}}) => {
  const { data } = useQuery(
    ["API.of().readItem", BLOG_POST, post?.id],
    async () => await GistAPI.of({ category: BLOG_POST }).readItem(post?.id as string),
    { initialData: null }
  );

  const is404 = ((data ?? {})?.data ?? post)?.body == null;

  if (is404) {
    return <>404 Page</>;
  }

  const { body, category, date, title} = parsePost((data ?? {})?.data ?? post);

  return (
    <ResponsivePage
      mainBackgroundColor={Colors.Dark}
      subBackgroundColor={Colors.DeepDark}
      fontColor={Colors.SoftWhite}
      desktopPageWidth="840px"
    >
      <h4>{category}</h4>
      <p style={{ fontSize: '1rem', color: Colors.DeepDark }}>{post?.id}</p>
      <p style={{ fontSize: '1rem' }}>{date?.toLocaleString('ko-KR')}</p>
      <h2 style={{ textDecoration: 'underline', wordBreak: 'keep-all' }}>{title}</h2>
      <Spacing size={20} />

      <Post dangerouslySetInnerHTML={{ __html: withMD2HTML(body) }} />
    </ResponsivePage>
  )
};
