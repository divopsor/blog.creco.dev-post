'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { BLOG_POST } from '../constants';
import { GistAPI, Colors, ResponsivePage, Spacing, Post } from '@divops-packages/blog-creco-dev';
import { parsePost } from '../utils';

export const HomePage = () => {
  const router = useRouter();
  const category = BLOG_POST;
  const { data: list = [] } = useQuery(["API.of().readList", category], GistAPI.of({ category }).readList);

  const posts = list.map(parsePost);


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
