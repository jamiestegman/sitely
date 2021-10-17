import '../styles/globals.css';
import Head from 'next/head';
import ActionButton from '../components/ActionButton';

function App({ Component, pageProps }) {

  return (
    <>
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Roboto+Mono:wght@400&family=Source+Sans+Pro:wght@500;600&display=swap" rel="stylesheet" />
      <title>Sitely - Resource Hub for Frontend Developers</title>
      <link rel="icon" href="/images/favicon.ico" />
    </Head>
    <ActionButton />
    <Component {...pageProps} />
    </>
  )
}

export default App;
