import {
  getCrecoAppStaticPaths,
  getCrecoAppStaticProps,
} from "@divops-packages/blog-creco-dev";
import { GetStaticProps } from "next";
import { DetailsPage } from "../../../src/containers/DetailsPage";
import NotFoundPage from "../../../src/containers/NotFoundPage";
import axios from 'axios';
import { Item } from "../../../src/types";

export const getStaticPaths = async () =>
  getCrecoAppStaticPaths({
    category: "blog-doodle",
    prefix: "/github-api/api/gist",
  });

export const getStaticProps: GetStaticProps = async (context) => {
  const { props } = await getCrecoAppStaticProps(context, {
    category: "blog-doodle",
    prefix: "/github-api/api/gist",
  });

  if (props.item?.body == null) {
    return { props };
  }

  const markdown: string = props.item.body.contents;
  const { data } = await axios.post('https://app.divops.kr/api/markdown/render', { markdown });

  props.item.body.markdown = data.data;

  return { props };
}

export default function ({ item }: { item?: Item }) {
  if (item == null) {
    return <NotFoundPage />;
  }

  return <DetailsPage item={item} />;
}
