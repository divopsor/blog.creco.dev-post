'use client';

import { useRouter } from 'next/navigation';
import { Colors, ResponsivePage, Spacing } from '@divops-packages/blog-creco-dev';
import { usePosts } from '../hooks/usePosts';

export const HomePage = ({ posts: initialPosts }: { posts: any }) => {
  const router = useRouter();
  const posts = usePosts(initialPosts);

  posts.sort((postA, postB) => postA.createdAt > postB.createdAt ? -1 : 1);

  return (
    <ResponsivePage
      mainBackgroundColor={Colors.Dark}
      subBackgroundColor={Colors.DeepDark}
      fontColor={Colors.SoftWhite}
      desktopPageWidth="840px"
    >
      <Spacing size={12} />
      <h1>Creco's post</h1>
      <Spacing size={60} />

      <ul>
      {
        posts.map((post: any) => {
          return (
            <li
              className="clickable"
              style={{
                fontSize: '1.6rem',
                margin: '0 0 48px',
                textDecoration: 'unset',
              }}
              key={post.id}
              onClick={() => {
                router.push(`/${post.id}`);
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{post.category}</span>
              <h3>{post.title}</h3>
              <Spacing size={4} />
              <span style={{ color: Colors.SoftGrey }}>{post.body.split('\n')[0]}</span>
            </li>
          );
        })
      }
      </ul>
    </ResponsivePage>
  )
};
