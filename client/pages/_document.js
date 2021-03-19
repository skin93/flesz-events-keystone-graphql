import { Fragment } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'

import { GA_TRACKING_ID } from '../lib/gtag'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
      })

    const initialProps = await Document.getInitialProps(ctx)

    const isProduction = process.env.NODE_ENV === 'production'

    return {
      ...initialProps,
      isProduction,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement()
      ]
    }
  }

  render() {
    const { isProduction } = this.props
    return (
      <Html lang='pl'>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link rel='icon' href='favicon.ico' />
          <link
            href='https://fonts.googleapis.com/css2?family=Lato&display=swap'
            rel='stylesheet'
          />
        </Head>
        {isProduction && (
          <Fragment>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `
              }}
            />
          </Fragment>
        )}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
