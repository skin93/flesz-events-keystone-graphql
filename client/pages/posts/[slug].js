import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

import Skeleton from '@material-ui/lab/Skeleton'

import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Fade from '@material-ui/core/Fade'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'

import { useQuery } from '@apollo/client'
import { SINGLE_POST_QUERY } from '../../lib/queries/posts/singlePostQuery'
import SEO from '../../components/SEO'

const PostPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const { slug } = router.query

  const { loading, error, data } = useQuery(SINGLE_POST_QUERY, {
    variables: { slug }
  })

  if (error) {
    return <Error message='Can not fetch data' />
  }

  const post = data && data.allPosts[0]

  return (
    <Fade in={true} timeout={500}>
      {loading ? (
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
      ) : (
        <article className={classes.root}>
          <SEO
            title={post.title}
            description={post.excerpt}
            image={post.cover_url}
          />
          <Box component='div' className={classes.chips}>
            <Link href={`/categories/${post.category.slug}`}>
              <a>
                <Chip label={post.category.name} className={classes.category} />
              </a>
            </Link>
            {post.tags.map((tag) => (
              <Link key={tag.slug} href={`/tags/${tag.slug}`}>
                <a>
                  <Chip
                    key={tag.name}
                    label={tag.name}
                    className={classes.tagItem}
                  />
                </a>
              </Link>
            ))}
            <Chip
              label={post.createdAt.split('T')[0]}
              className={classes.createdAt}
            />
            {post.authors.map((author) => (
              <Chip
                label={<span>@{author.name}</span>}
                key={author.name}
                className={classes.author}
              />
            ))}
          </Box>
          <Typography
            variant='h3'
            component='h1'
            aria-label='article-title'
            className={classes.title}
          >
            {post.title}
          </Typography>
          <Typography
            variant='subtitle1'
            className={classes.excerpt}
            aria-label='article-excerpt'
          >
            {post.excerpt}
          </Typography>

          <Grid container aria-label='article-content'>
            <Grid item>
              <Image
                src={post.cover_url}
                width={800}
                height={450}
                quality={100}
                layout='responsive'
                alt={post.title}
                aria-label='article-cover'
              />

              <Typography
                variant='caption'
                className={classes.coverSrc}
                aria-label='article-cover-src'
              >
                {post.cover_src}
              </Typography>
              <Box
                dangerouslySetInnerHTML={{ __html: post.body }}
                className={classes.body}
                aria-label='article-body'
              />
              <Divider />
            </Grid>
          </Grid>
        </article>
      )}
    </Fade>
  )
}

export default PostPage

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '15px'
  },
  chips: {
    marginBottom: '30px'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 'calc(1.1rem + 2vw)'
  },
  excerpt: {
    fontSize: 'calc(.7rem + .5vw)',
    fontWeight: 100,
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
    color: theme.palette.black.main,
    fontWeight: `bold`,
    backgroundColor: theme.palette.accent.main,
    cursor: 'pointer',
    textTransform: 'uppercase',
    marginRight: '10px',
    fontSize: '.7em'
  },
  tagItem: {
    fontWeight: `bold`,
    cursor: 'pointer',
    textTransform: 'uppercase',
    marginRight: '10px',
    fontSize: '.7em'
  },
  createdAt: {
    backgroundColor: theme.palette.muted.darker,
    marginRight: '10px',
    fontSize: '.7em'
  },
  author: {
    backgroundColor: theme.palette.muted.darker
  },
  divider: {
    margin: `30px 0`,
    height: `5px`,
    backgroundColor: theme.palette.muted.main
  }
}))
