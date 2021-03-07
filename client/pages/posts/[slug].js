import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'

import { useQuery } from '@apollo/client'
import { SINGLE_POST_QUERY } from '../../lib/queries/posts/singlePostQuery'

const PostPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const { slug } = router.query

  const { loading, error, data } = useQuery(SINGLE_POST_QUERY, {
    variables: { slug }
  })

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <Error message='Can not fetch data' />
  }
  if (!data) {
    return <p>Not Found</p>
  }

  const post = data && data.allPosts[0]

  return (
    <article className={classes.root}>
      <Grid container className={classes.publishedContainer}>
        <Grid item>
          <Link href={`/categories/${post.category.slug}`}>
            <a>
              <Chip
                label={post.category.name}
                className={classes.categoryItem}
              />
            </a>
          </Link>
        </Grid>
        <Grid item>
          {post.tags.map((tag) => (
            <Link href={`/tags/${tag.slug}`}>
              <a>
                <Chip
                  key={tag.name}
                  label={<span>#{tag.name}</span>}
                  className={classes.tagItem}
                />
              </a>
            </Link>
          ))}
        </Grid>
        <Grid item>
          <Chip
            label={post.createdAt.split('T')[0]}
            className={classes.createdAt}
          />
        </Grid>
        <Grid item>
          {post.authors.map((author) => (
            <Chip
              label={author.name}
              key={author.name}
              className={classes.author}
            />
          ))}
        </Grid>
      </Grid>

      <Typography
        variant='h4'
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
  )
}

export default PostPage

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '15px'
  },
  title: {
    fontWeight: 'bold'
  },
  excerpt: {
    marginBottom: '30px',
    fontWeight: 100,
    color: theme.palette.muted.main
  },
  publishedContainer: {
    marginBottom: `30px`,
    alignItems: `center`,
    '& div': {
      marginRight: '5px',
      borderRadius: 0
    }
  },
  coverSrc: {
    color: theme.palette.muted.main,
    fontWeight: 'bold'
  },
  body: {
    color: theme.palette.muted.main
  },
  categoryItem: {
    color: theme.palette.black.main,
    fontWeight: `bold`,
    backgroundColor: theme.palette.accent.main,
    cursor: 'pointer',
    textTransform: 'uppercase'
  },
  tagItem: {
    fontWeight: `bold`,
    backgroundColor: theme.palette.muted.darker,
    cursor: 'pointer',
    textTransform: 'uppercase'
  },
  createdAt: {
    backgroundColor: theme.palette.muted.darker
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
