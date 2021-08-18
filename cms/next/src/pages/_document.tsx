import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class Layout extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <title>#この１年でやってみた</title>
          <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no" />
          <meta name="description" content="あなたがこの１年でやってみたことを書いてみましょう。" />
          <meta name="keywords" content="#この１年でやってみた" />
          <meta name="author" content="" />
          <meta name="generator" content="microCMS" />
          <meta property="og:title" content="#この１年でやってみた" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://my-this-year.vercel.app/" />
          <meta property="og:image" content="https://my-this-year.vercel.app/thumbnail.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content="#この１年でやってみた" />
          <meta property="og:description" content="あなたがこの１年でやってみたことを書いてみましょう。" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="#この１年でやってみた" />
          <meta name="twitter:description" content="あなたがこの１年でやってみたことを書いてみましょう。" />
          <meta name="twitter:image:src" content="https://my-this-year.vercel.app/thumbnail.jpg" />
          <meta name="format-detection" content="telephone=no" />
          <link rel="shortcut icon" href="https://my-this-year.vercel.app/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap" rel="stylesheet" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-VS860CVJFF"></script>
        </Head>
        <body>
        <div className="white-header"> </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}