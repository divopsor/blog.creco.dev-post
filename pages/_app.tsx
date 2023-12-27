import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalCss } from '../src/components/GlobalCss';
import { Colors } from '../src/constants';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  pageProps.style = {
    ...pageProps.style,
    backgroundColor: Colors.Dark,
  }

  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0, viewport-fit=cover" name="viewport" />
        <link rel="shortcut icon" type="image/x-icon" href="/post/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <div className='mobile-ui' style={{ width: 0, height: 0 }} />
      <div className='desktop-ui' style={{ width: 0, height: 0 }} />
      <GlobalCss />
      </QueryClientProvider>
    </>
  )
}