import { GetStaticPaths, GetStaticProps } from 'next';
import { DetailsPage } from '../../src/containers/DetailsPage';

let cache: any;
async function fetchList () {
  if (cache != null) {
    return cache;
  }

  const { data: posts } = await fetch('https://blog.creco.dev/api/gist/ce62b77189108398c8655c33dbb608ee/list').then((res) => res.json())
  
  cache = posts;
  
  return cache;
}

export default function ({ post }: { post: { id: string; body: { contents: string; createdAt: number; updatedAt: number; }}}) {
  return <DetailsPage post={post} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchList();
  const paths = posts.items.map((post: any) => {
    return { params: { id: post.id } };
  });

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  if (params?.id == null) {
    return { props: {} };
  }

  const posts = await fetchList();
  const post = posts.items.find((post: any) => post.id === params!.id)!;

  return { props: { post } }
}
