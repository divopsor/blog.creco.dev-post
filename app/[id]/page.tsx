import { DetailsPage } from "../containers/DetailsPage";

export default function ({ params }: { params: { id: string }}) {
  return <DetailsPage params={params} />;
}

export async function generateStaticParams() {
  const { data: posts } = await fetch('https://blog.creco.dev/api/gist/ce62b77189108398c8655c33dbb608ee/list').then((res) => res.json())
 
  console.log({ items: posts.items });

  return posts.items.map((post: any) => ({
    id: post.id,
  }))
}
