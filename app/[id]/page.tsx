import { DetailsPage } from "../containers/DetailsPage";

let cache: any;
async function fetchList () {
  if (cache != null) {
    return cache;
  }

  const { data: posts } = await fetch('https://blog.creco.dev/api/gist/ce62b77189108398c8655c33dbb608ee/list').then((res) => res.json())
  
  cache = posts;
  
  return cache;
}

export default function ({ params }: { params: { id: string; body: { contents: string; createdAt: number } }}) {
  return <DetailsPage params={params} />;
}

export const generateStaticParams = async () => {
  const posts = await fetchList();
  const result = posts.items.map((post: any) => {
    return { id: post.id };
  });

  return result;
}

export const generateMetadata = async ({ params }: any) => {
  const { id } = params;
  const posts = await fetchList();

  return posts.items.find((post: any) => post.id === id)!;
}
