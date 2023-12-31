import { getCrecoAppStaticPaths, getCrecoAppStaticProps } from '@divops-packages/blog-creco-dev';
import { GetStaticProps } from 'next';
import { CATEGORY } from '../../src/constants';
import { DetailsPage } from '../../src/containers/DetailsPage';
import NotFoundPage from '../../src/containers/NotFoundPage';

export const getStaticPaths = async () => getCrecoAppStaticPaths({ category: CATEGORY });

export const getStaticProps: GetStaticProps = async (context) => getCrecoAppStaticProps(context, { category: CATEGORY });

export default function ({ item }: { item?: { id: string; body?: { contents: string; createdAt: number; updatedAt: number; }}}) {
  if (item == null) {
    return <NotFoundPage />;
  }

  return <DetailsPage item={item} />;
}
