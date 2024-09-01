import { QueryClient } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { CrecoApp, Colors } from '@divops-packages/blog-creco-dev';

const queryClient = new QueryClient();
const cssText = CrecoApp.GlobalCss;
export default function App({ Component, pageProps }: AppProps) {
  pageProps.style = {
    ...pageProps.style,
    backgroundColor: Colors.Dark,
  }

  return (
    <>
      <Head>
        <CrecoApp.Heads />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4M82715ZRX"></script>
        <script dangerouslySetInnerHTML={
          {
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4M82715ZRX');
            `
          }
        }/>
      </Head>
      <CrecoApp queryClient={queryClient}>
        <Component {...pageProps} />
      </CrecoApp>
      <style global jsx>{cssText}</style>
    </>
  )
}
