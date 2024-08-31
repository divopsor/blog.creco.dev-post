import { CATEGORY } from '../src/constants';

export { HomePage as default } from '../src/containers/HomePage';

export const getStaticProps = async () => {
  const url = `https://blog.creco.dev/github-api/api/gist/${CATEGORY}/list`;

  const { data } = await fetch(url).then((res) => res.json());

  return { props: { list: data.items } };
}
