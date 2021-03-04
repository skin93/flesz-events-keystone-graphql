import React from 'react'
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
      <Typography variant='h1' className={classes.title}>
        {post.title}
      </Typography>
      <Grid container className={classes.publishedContainer}>
        <Grid item>
          {post.tags.map((tag) => (
            <Chip key={tag.name} label={tag.name} className={classes.tagItem} />
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
      <Grid container spacing={3}>
        <Grid item lg={8}>
          <Image
            src={post.cover_url}
            width={800}
            height={450}
            quality={100}
            layout='responsive'
            alt={post.title}
          />
          <Typography variant='caption' className={classes.coverSrc}>
            {post.cover_src}
          </Typography>
          <Typography variant='subtitle1' className={classes.excerpt}>
            {post.excerpt}
          </Typography>
          <Divider light className={classes.divider} />
          <Box
            dangerouslySetInnerHTML={{ __html: post.body }}
            className={classes.body}
          />
          <Divider className={classes.divider} />
        </Grid>
        {/* TODO: Featured posts column */}
        <Grid item lg={4}>
          cos
        </Grid>
      </Grid>
    </article>
  )
}

export default PostPage

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  publishedContainer: {
    margin: `30px 0`,
    alignItems: `center`,
    '& div': {
      marginRight: '5px',
      borderRadius: 0
    }
  },
  title: {
    marginTop: 30
  },
  coverSrc: {
    color: theme.palette.muted.main,
    fontWeight: 'bold'
  },
  body: {
    color: theme.palette.muted.main
  },
  tagItem: {
    color: theme.palette.black.main,
    fontWeight: `bold`,
    backgroundColor: theme.palette.accent.main
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
  },
  excerpt: {
    marginTop: 30
  }
}))
