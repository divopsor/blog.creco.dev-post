'use client';

import { Colors, ResponsivePage, Spacing } from '@divops-packages/blog-creco-dev';
import { usePosts } from '../hooks/usePosts';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Logo } from '../components/Logo';
import { Divider } from '../components/Divider';
import { formattedDateYYYYMMDD } from '../utils';

export const HomePage = ({ list: initialList }: { list: any }) => {
  const list = usePosts(initialList);

  list.sort((itemA, itemB) => {
    if (itemA?.createdAt == null || itemB?.createdAt == null) {
      return 0;
    }

    return itemA.createdAt > itemB.createdAt ? -1 : 1
  });

  return (
    <ResponsivePage
      mainBackgroundColor={Colors.Dark}
      subBackgroundColor={Colors.DeepDark}
      fontColor={Colors.SoftWhite}
      desktopPageWidth="840px"
    >
      <Header>
        <Logo />
      </Header>

      <Spacing size={20} />

      <p style={{ fontSize: '60px', fontWeight: 'bold' }}>Posts</p>

      <Spacing size={14} />

      <p style={{ fontSize: '20px', color: 'grey', fontWeight: 'light' }}>Creco</p>

      <Spacing size={20} />

      <Divider />

      <ul>
      {
        list.map((item: any) => {
          return (
            <li key={item.id} style={{
              width: '100%',
              borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
              padding: '48px 0',
            }}>
              <Link
                href={`/${item.id}`}
                className="clickable"
                style={{
                  fontSize: '1.6rem',
                  textDecoration: 'unset',
                }}
              >
                <time style={{ color: 'grey' }}>{formattedDateYYYYMMDD(new Date(item.createdAt))}</time> <br />
                <Spacing size={4} />
                <span style={{ lineHeight: '100%', fontSize: '1.2rem' }}>{item.category}</span>
                <h3>{item.title}</h3>
                <Spacing size={20} />
                <span style={{ lineHeight: '100%', color: Colors.SoftGrey }}>{item.body.split(/<br>|\n/)[0]}</span>
                <Spacing size={20} />
                <p style={{ color: 'rgb(14, 165, 233)' }}>Read more →</p>
              </Link>
            </li>
          );
        })
      }
      </ul>
    </ResponsivePage>
  )
};
