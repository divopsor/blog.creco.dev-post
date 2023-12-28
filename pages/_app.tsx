import { QueryClient } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { CrecoApp, Colors } from '@divops-packages/blog-creco-dev';
import '@divops-packages/blog-creco-dev/crecoApp.css';
import '@divops-packages/blog-creco-dev/global.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  pageProps.style = {
    ...pageProps.style,
    backgroundColor: Colors.Dark,
  }

  return (
    <>
      <Head>
        <CrecoApp.Heads />
      </Head>
      <CrecoApp queryClient={queryClient}>
        <Component {...pageProps} />
      </CrecoApp>
    </>
  )
}
