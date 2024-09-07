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
    thumbnail: extractFirstImage(details?.body?.contents),
    description: extractSentenceByOrder(details?.body?.contents),
  } as const;
}

function extractFirstImage(contents?: string) {
  if (!contents) {
    return null;
  }

  // 이미지 태그를 찾는 정규식
  const imageRegex = /!\[.*?\]\((.*?)\)/;

  // 첫 번째 이미지 URL 추출
  const match = contents.match(imageRegex);

  // 이미지 URL 반환 (match가 있으면 첫 번째 그룹 반환)
  return match ? match[1] : null;
}

function extractSentenceByOrder(contents?: string) {
  if (!contents) {
    return null;
  }

  const sentences = contents.split(/\n/).filter((x) => x.length > 0);
  const targetSentence = sentences[2];

  return targetSentence || null; // 해당 순서에 문장이 있으면 반환, 없으면 null 반환
}
