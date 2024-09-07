import { Item } from "./types";

export function formattedDateYYYYMMDD(date: Date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const _date = date.getUTCDate();

  return `${year}-${month < 10 ? "0" + month : month}-${
    _date < 10 ? "0" + _date : _date
  }`;
}

function formattedDate(date: Date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const _date = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  return `${year}년 ${month}월 ${_date}일 ${hours}시 ${minutes}분 ${seconds}초`;
}

export function parsePost(post: Item) {
  if (post == null) {
    return {};
  }

  const details = post;
  const contents = details?.body?.markdown ?? details?.body?.contents;

  const [category, title, ...body] =
    contents?.trim?.().split?.(/<br>|\n/) ?? [];
  const timestamp =
    details?.body?.updatedAt ?? (details?.body?.createdAt as number);
  const date = formattedDate(new Date(timestamp + 9 * 3600_000));

  return {
    id: post.id,
    category: category?.replace(/^<p>/, "").replace(/<\/p>$/, ""),
    title: title?.replace(/^<p>/, "").replace(/<\/p>$/, ""),
    body: body?.join("<br>")?.trim?.(),
    createdAt: details?.body?.createdAt,
    timestamp,
    date,
  } as const;
}
