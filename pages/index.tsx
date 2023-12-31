import { CATEGORY } from '../src/constants';

export { HomePage as default } from '../src/containers/HomePage';

export const getStaticProps = async () => {
  const url = `https://blog.creco.dev/api/gist/${CATEGORY}/list`;

  const { data } = await fetch(url).then((res) => res.json());

  return { props: { posts: data.items } };
}
