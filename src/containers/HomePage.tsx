'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { BLOG_POST } from '../../pages/api/constant';
import { API } from '../../pages/api/gist';
import { HTMLAttributes, useState } from 'react';
import { Page } from '../components/Page';
import { Spacing } from '../components/Spacing';

export const HomePage = () => {
  const router = useRouter();
  const category = BLOG_POST;
  const { data: list = [] } = useQuery(["API.of().readList", category], API.of(category).readList);

  return (
    <Page>
      <Spacing size={12} />
      <h1>Creco's post</h1>
      <Spacing size={20} />

      {
        list.map((x: any) => (
          <Post
            key={x.id}
            onClick={() => {
              router.push(`/${x.id}`);
            }}
          >{x.body.contents.trim().split('\n')[0]}</Post>
        ))
      }
    </Page>
  )
};

const Post = (props: HTMLAttributes<HTMLDivElement>) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
      className={hover ? props.className == null ? `underline` : `underline ${props.className}` : props.className}
      style={{
        fontSize: '1.6rem',
        margin: '14px 0',
        ...props.style,
      }}
    />
  )
}
