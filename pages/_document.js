import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from 'styled-components';

function setInitialTheme() {
  function getInitialTheme() {
    const persistedColorPreference = window.localStorage.getItem('theme');
    const hasPersistedPreference = typeof persistedColorPreference === 'string';
    // If the user has explicitly chosen light or dark,
    // let's use it. Otherwise, this value will be null.
    if (hasPersistedPreference) return persistedColorPreference;

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';
    if (hasMediaQueryPreference) {
      return mql.matches ? 'dark' : 'light';
    }
    return 'dark';
  }


  const initialTheme = getInitialTheme();
  if (initialTheme === "light") document.body.classList.add("light-mode");
}


const blockingSetInitialTheme = `(function() {
  ${setInitialTheme.toString()}
    setInitialTheme();
})()
`;


export default class MyDocument extends Document {

  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
        <Html>
            <Head>
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Roboto+Mono:wght@400&family=Source+Sans+Pro:wght@500;600&display=swap" rel="stylesheet" />
              <title>Sitely - Resource Hub for Frontend Developers</title>
              <link rel="icon" href="/images/favicon.ico" />
            </Head>
            <body>
                <script
                    dangerouslySetInnerHTML={{
                        __html: blockingSetInitialTheme,
                    }}
                ></script>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
}