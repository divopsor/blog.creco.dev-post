import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { GlobalCss } from '../src/components/GlobalCss';
 
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0, viewport-fit=cover" name="viewport" />
      <Component {...pageProps} />
      <GlobalCss />
    </QueryClientProvider>
  )
}