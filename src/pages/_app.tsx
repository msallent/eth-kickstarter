import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Layout } from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>ETH Kickstarter</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
