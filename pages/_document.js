import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <meta name="viewport" content="width=device-width,minimum-scale=1, initial-scale=1" /> */}
          <link rel="icon" href="../public/favicon.ico" type="image/x-icon" />


          <title>Design Mesh</title>
        </Head>
        <body>
          <Main />
          <NextScript />
          <Analytics />
          <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "3724d45e2d0343cbaf99d3beeeebfc3c"}'></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
