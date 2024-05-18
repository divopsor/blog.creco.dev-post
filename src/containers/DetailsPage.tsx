import { Post, ResponsivePage, withMD2HTML, Colors, Spacing } from '@divops-packages/blog-creco-dev';
import Head from 'next/head';
import { Divider } from '../components/Divider';
import { Header } from '../components/Header';
import { Logo } from '../components/Logo';
import { usePost } from '../hooks/usePost';
import { formattedDateYYYYMMDD, parsePost } from '../utils';

export const DetailsPage = ({ item }: { item: { id: string; body?: { contents: string; createdAt: number; updatedAt: number }}}) => {
  const data = usePost(item.id);
  const is404 = ((data ?? {})?.data ?? item)?.body == null;

  if (is404) {
    return <>404 Page</>;
  }

  const { body, category, date, title } = parsePost((data ?? {})?.data ?? item);

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

      <Head>
        <title>{title}</title>
      </Head>

      <div style={{ textAlign: 'center' }}>
        {
          item.body?.createdAt != null && <> <time style={{ color: 'grey' }}>{formattedDateYYYYMMDD(new Date(item.body?.createdAt ))}</time> <br /> </>
        }
      </div>
      <Spacing size={10} />
      
      <h3 style={{ textAlign: 'center', textDecoration: 'underline', wordBreak: 'keep-all' }}>{category}</h3>
      <Spacing size={20} />
      
      <h1 style={{ fontSize: '48px', textAlign: 'center', textDecoration: 'underline', wordBreak: 'keep-all' }}>{title}</h1>
      <Spacing size={20} />

      <Divider />
      <Spacing size={60} />

      <Post style={{ textIndent: '0px' }} dangerouslySetInnerHTML={{ __html: withMD2HTML(body) }} />
    </ResponsivePage>
  )
};
