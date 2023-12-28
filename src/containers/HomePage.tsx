'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { BLOG_POST } from '../constants';
import { GistAPI, Colors, ResponsivePage, Spacing, Post } from '@divops-packages/blog-creco-dev';

export const HomePage = () => {
  const router = useRouter();
  const category = BLOG_POST;
  const { data: list = [] } = useQuery(["API.of().readList", category], GistAPI.of({ category }).readList);

  return (
    <ResponsivePage
      mainBackgroundColor={Colors.Dark}
      subBackgroundColor={Colors.DeepDark}
      fontColor={Colors.SoftWhite}
      desktopPageWidth="840px"
    >
      <Spacing size={12} />
      <h1>Creco's post</h1>
      <Spacing size={20} />

      {
        list.map((x: any) => (
          <Post
            className="clickable"
            style={{
              fontSize: '1.6rem',
              margin: '14px 0',
            }}
            key={x.id}
            onClick={() => {
              router.push(`/${x.id}`);
            }}
          >{x.body.contents.trim().split('\n')[0]}</Post>
        ))
      }
    </ResponsivePage>
  )
};
