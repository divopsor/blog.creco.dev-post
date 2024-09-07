import { HTMLAttributes } from 'react';
import { ResponsivePage, withMD2HTML, Colors, Spacing } from '@divops-packages/blog-creco-dev';
import Head from 'next/head';
import { Divider } from '../components/Divider';
import { Header } from '../components/Header';
import { Logo } from '../components/Logo';
import { usePost } from '../hooks/usePost';
import { formattedDateYYYYMMDD, parsePost } from '../utils';
import Giscus from '@giscus/react';
import { Item } from '../types';
import styles from './DetailsPage.module.css';

export const DetailsPage = ({ item }: { item: Item }) => {
  const freshData = usePost(item.id);
  const data = freshData ?? item;
  const { category, title, body, thumbnail } = parsePost(data);

  return (
    <ResponsivePage
      mainBackgroundColor={Colors.Dark}
      subBackgroundColor={Colors.DeepDark}
      fontColor={Colors.SoftWhite}
      desktopPageWidth="1200px"
    >
      <div style={{
        maxWidth: '840px',
        margin: "0 auto",
      }}>
      <Header>
        <Logo href="/" />
      </Header>

      <Spacing size={20} />

      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" content={body?.split("<br>").slice(0,10).join('\n')} key="description" />
        {thumbnail != null ? <meta property="og:image" content={thumbnail} key="image" /> : null}
        <meta property="og:url" content={`https://blog.creco.dev/post/${item.id}`} key="url" />
        <meta property="og:type" content="article" key="type" />
        <meta property="og:site_name" content="Creco's Blog" key="site_name" />
        <meta property="og:locale" content="ko_KR" key="locale" />
        <meta name="twitter:card" content="summary" key="twitter_card" />
        <meta name="twitter:site" content="@CreatiCoding" key="twitter_site" />
        <meta name="twitter:creator" content="@CreatiCoding" key="twitter_creator" />
        <meta name="twitter:title" content={title} key="twitter_title" />
        <meta name="twitter:description" content={body?.split("<br>").slice(0,10).join('\n')} key="twitter_description" />
        {thumbnail != null ? <meta name="twitter:image" content={thumbnail} key="twitter_image" /> : null}
        <meta name="twitter:url" content={`https://blog.creco.dev/post/${item.id}`} key="twitter_url" />
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

      <Post className={styles.post} dangerouslySetInnerHTML={{ __html: body! }} />
      
      <Spacing size={60} />
      <Giscus
        id="comments"
        repo="divopsor/blog.creco.dev-main"
        repoId="R_kgDOK_YnUw"
        category="General"
        categoryId="DIC_kwDOK_YnU84Ch8Ry"
        mapping="url"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="1"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="ko"
        loading="lazy"
        strict='0'
      />
      </div>
    </ResponsivePage>
  )
};


const Post = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={className}
      style={{
        fontSize: '1.6rem',
        wordBreak: 'keep-all',
        ...props.style,
      }}
    />
  );
};
