'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { API } from '../api';
import { BLOG_POST } from '../api/constant';
import { Card } from '@divops-packages/ui';

export const HomePage = () => {
  const router = useRouter();
  const category = BLOG_POST;
  const { data: list } = useQuery(["API.of().readList", category], API.of(category).readList);

  return (
    <div>
      <h1>speculate of Creco</h1>
      {
        (list ?? []).map((x: any) => (
          <Card
            useHover={true}
            key={x.id}
            onClick={() => {
              router.push(`/${x.id}`);
            }}
          >{x.body.contents.trim().split('\n')[0]}</Card>
        ))
      }
    </div>
  )
};
