export function formattedDateYYYYMMDD(date: Date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const _date = date.getUTCDate();

  return `${year}-${month < 10 ? '0' + month : month}-${_date < 10 ? '0' + _date : _date}`;
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

export function parsePost(post?: any) {
  if (post == null) {
    return {};
  }

  const details = post;

  const [category, title, ...body] = details?.body?.contents?.trim?.().split?.('\n') ?? [];
  const timestamp = details?.body?.updatedAt ?? details?.body?.createdAt;
  const date = formattedDate(new Date(timestamp + 9 * 3600_000));

  return {
    id: post.id,
    category,
    title,
    body: body?.join('\n')?.trim?.(),
    createdAt: details?.body?.createdAt,
    timestamp,
    date
  } as const;
}