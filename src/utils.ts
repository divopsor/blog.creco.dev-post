export function parsePost(post?: any) {
  if (post == null) {
    return {};
  }

  const details = post;

  const [category, title, ...body] = details?.body.contents.trim().split('\n') ?? [];
  const timestamp = details?.body.updatedAt ?? details?.body.createdAt;
  const date = new Date(timestamp);

  return {
    id: post.id,
    category,
    title,
    body: body.join('\n').trim(),
    timestamp,
    date
  } as const;
}