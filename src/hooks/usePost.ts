import { GistAPI, useGistItem } from "@divops-packages/blog-creco-dev";
import axios from "axios";
import { useEffect, useState } from "react";
import { CATEGORY } from "../constants";
import { Item } from "../types";

async function getMarkdown(contents: string) {
  const { data } = await axios.post("/api/markdown/render", {
    markdown: contents,
  });
  return data.data;
}

export function usePost(id: string) {
  const detailData = useGistItem(CATEGORY, id, {
    prefix: "/github-api/api/gist",
  });

  const [data, setData] = useState<Item | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const item = detailData?.data as Item;
        if (item?.body == null) {
          return;
        }

        item.body.markdown = await getMarkdown(item.body.contents);
        setData(item);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [detailData]);

  return data;
}
