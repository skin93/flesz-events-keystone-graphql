import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import useSWR from 'swr'
import { request } from 'graphql-request'
import { PREVIEW_POST_QUERY } from '../../lib/queries/posts/previewPostQuery'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import Fade from '@material-ui/core/Fade'
import Skeleton from '@material-ui/lab/Skeleton'

import FeaturedPosts from '../../components/layout/FeaturedPosts'
import Disqus from '../../components/Disqus'

const PreviewPage = (props) => {
  const router = useRouter()
  const id = router.query.id
  const classes = useStyles()

  const q = PREVIEW_POST_QUERY

  const fetcher = (query, id) =>
    request(process.env.NEXT_PUBLIC_API, query, { id })

  const { error, data } = useSWR([q, id], fetcher, {
    initialData: props.data
  })

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <p>Coś poszło nie tak...</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div>
        <Skeleton variant='rect' width={800} height={50} />
        <Skeleton variant='text' width={800} />
        <Skeleton variant='rect' width={800} />
        <Skeleton variant='rect' width={800} height={450} />
        <Skeleton variant='text' width={800} />
        <Skeleton variant='text' width={800} />
        <Skeleton variant='rect' width={800} height={200} />
        <Skeleton variant='text' width={800} />
      </div>
    )
  }

  return (
    <Fade in timeout={500}>
      <section
        aria-label='preview-page'
        style={{ flexGrow: 1, padding: '15px' }}
      >
        <Box component='div' className={classes.chips}>
          <Link href={`/categories/${data.allPosts[0].category.slug}`}>
            <a>
              <Chip
                variant='outlined'
                label={data.allPosts[0].category.name}
                className={classes.category}
              />
            </a>
          </Link>
          {data.allPosts[0].tags.map((tag) => (
            <Link key={tag.slug} href={`/tags/${tag.slug}`}>
              <a>
                <Chip
                  key={tag.name}
                  label={tag.name}
                  className={classes.tagItem}
                  variant='outlined'
                />
              </a>
            </Link>
          ))}
          <Chip
            label={data.allPosts[0].createdAt.split('T')[0]}
            className={classes.createdAt}
            variant='outlined'
          />
          {data.allPosts[0].authors.map((author) => (
            <Chip
              label={author.name}
              key={author.name}
              className={classes.author}
              variant='outlined'
            />
          ))}
        </Box>
        <Typography
          variant='h3'
          component='h1'
          aria-label='article-title'
          className={classes.title}
        >
          {data.allPosts[0].title}
        </Typography>
        <Divider className={classes.divider} />
        <Grid container justify='space-between'>
          <Grid item xs={12} lg={8} component='article'>
            <Grid container>
              <Grid item>
                <Image
                  src={data.allPosts[0].cover_url}
                  width={800}
                  height={450}
                  quality={100}
                  layout='responsive'
                  alt={data.allPosts[0].title}
                  aria-label='article-cover'
                />
                <Typography
                  variant='subtitle2'
                  className={classes.coverSrc}
                  aria-label='article-cover-src'
                >
                  {data.allPosts[0].cover_src}
                </Typography>
                <Typography
                  variant='subtitle1'
                  className={classes.excerpt}
                  aria-label='article-excerpt'
                >
                  {data.allPosts[0].excerpt}
                </Typography>
                <Divider className={classes.divider} />
                <Box
                  dangerouslySetInnerHTML={{ __html: data.allPosts[0].body }}
                  className={classes.body}
                  aria-label='article-body'
                />
                <Divider className={classes.divider} />
              </Grid>
            </Grid>
            <Disqus post={data.allPosts[0]} />
          </Grid>
          <Grid item xs={12} lg={1} />
          <Grid
            item
            xs={12}
            lg={3}
            container
            justify='center'
            component='aside'
          >
            <FeaturedPosts />
          </Grid>
        </Grid>
      </section>
    </Fade>
  )
}

export default PreviewPage

export async function getServerSideProps({ params }) {
  const data = await request(process.env.NEXT_PUBLIC_API, PREVIEW_POST_QUERY, {
    id: params.id
  })

  return {
    props: { data }
  }
}

const useStyles = makeStyles((theme) => ({
  chips: {
    margin: '0 0 30px 0'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 'calc(1.1rem + 2vw)'
  },
  excerpt: {
    fontSize: 'calc(.7rem + .5vw)',
    fontWeight: 'bold',
    color: theme.palette.light.main,
    margin: '30px 0'
  },
  coverSrc: {
    color: theme.palette.muted.main,
    fontWeight: 'bold'
  },
  body: {
    color: theme.palette.muted.main
  },
  category: {
    color: theme.palette.accent.main,
    cursor: 'pointer',
    textTransform: 'uppercase',
    marginRight: '10px',
    fontSize: 'calc(.7em + .2vw)',
    borderRadius: '0px',
    borderColor: theme.palette.accent.main
  },
  tagItem: {
    cursor: 'pointer',
    textTransform: 'uppercase',
    marginRight: '10px',
    fontSize: 'calc(.7em + .2vw)',
    borderRadius: '0px',
    color: theme.palette.light.main,
    borderColor: theme.palette.light.main
  },
  createdAt: {
    borderColor: theme.palette.muted.darker,
    marginRight: '10px',
    fontSize: 'calc(.7em + .2vw)',
    borderRadius: '0px'
  },
  author: {
    borderColor: theme.palette.muted.darker,
    borderRadius: '0px',
    fontSize: 'calc(.7em + .2vw)'
  },
  divider: {
    margin: `30px 0`,
    height: `3px`,
    backgroundColor: theme.palette.muted.main
  }
}))
