import { getCrecoAppStaticPaths, getCrecoAppStaticProps } from '@divops-packages/blog-creco-dev';
import { GetStaticProps } from 'next';
import { DetailsPage } from '../../src/containers/DetailsPage';
import NotFoundPage from '../../src/containers/NotFoundPage';

export const getStaticPaths = async () => getCrecoAppStaticPaths({ category: 'blog-post' });

export const getStaticProps: GetStaticProps = async (context) => getCrecoAppStaticProps(context, { category: 'blog-post' });

export default function ({ post }: { post?: { id: string; body?: { contents: string; createdAt: number; updatedAt: number; }}}) {
  if (post == null) {
    return <NotFoundPage />;
  }

  return <DetailsPage post={post} />;
}
