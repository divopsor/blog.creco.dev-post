'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { BLOG_POST } from '../constants';
import { GistAPI, Colors, ResponsivePage, Spacing, Post } from '@divops-packages/blog-creco-dev';

export const HomePage = () => {
  const router = useRouter();
  const category = BLOG_POST;
  const { data: list = [] } = useQuery(["API.of().readList", category], GistAPI.of({ category }).readList);

  const posts = list.reduce((acc: any, cur: any) => {
    const [category] = cur.body.contents.trim().split('\n');
    if (acc[category] == null) {
      acc[category] = [];
    }

    acc[category].push(cur);

    return acc;
  }, {});
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
        Object.entries(posts).map(([category, posts]: any) => {
          console.log(posts);
          return (
            <>
              <h4>{category}</h4>
              <ul>
                {
                  posts.map((x: any) => (
                    <li
                      className="clickable"
                      style={{
                        listStyle: 'circle',
                        fontSize: '1.6rem',
                        margin: '14px 0',
                        listStylePosition: 'inside',
                        textIndent: '4px',
                      }}
                      key={x.id}
                      onClick={() => {
                        router.push(`/${x.id}`);
                      }}
                    >{x.body.contents.trim().split('\n')[1]}</li>
                  ))
                }
              </ul>
            </>
          );
        })
      }
    </ResponsivePage>
  )
};
