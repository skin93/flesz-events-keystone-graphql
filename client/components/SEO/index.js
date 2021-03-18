import Head from 'next/head'
import { useRouter } from 'next/router'

const SEO = ({ title, description, image }) => {
  const router = useRouter()
  return (
    <Head>
      <title>
        {title
          ? `${title} | ${process.env.NEXT_PUBLIC_APP_NAME}`
          : process.env.NEXT_PUBLIC_APP_NAME}
      </title>

      <meta
        name='description'
        content={
          description ? description : 'Jesteśmy sKoncertowani na muzyce!'
        }
      />

      <link
        rel='canonical'
        href={`${process.env.NEXT_PUBLIC_APP_DOMAIN}${router.asPath}`}
      />

      <meta
        property='og:title'
        content={
          title
            ? `${title} | ${process.env.NEXT_PUBLIC_APP_NAME}`
            : process.env.NEXT_PUBLIC_APP_NAME
        }
      />
      <meta
        property='og:description'
        content={
          description ? description : 'Jesteśmy sKoncertowani na muzyce!'
        }
      />

      <meta property='og:type' content='website' />
      <meta
        property='og:url'
        content={`${process.env.NEXT_PUBLIC_APP_DOMAIN}${router.asPath}`}
      />
      <meta
        property='og:site_name'
        content={`${process.env.NEXT_PUBLIC_APP_NAME}`}
      />

      <meta
        property='og:image'
        content={image ? image : 'https://flesz.events/logo-publikacja.png'}
      />
      <meta
        property='og:image:secure_url'
        content={image ? image : 'https://flesz.events/logo-publikacja.png'}
      />
      <meta property='og:image:type' content='image/png' />
      <meta property='fb:app_id' content={`${process.env.NEXT_PUBLIC_FB_ID}`} />
    </Head>
  )
}

export default SEO
