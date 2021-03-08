import React from 'react'
import Link from 'next/link'

import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'

import { useQuery } from '@apollo/client'
import { ALL_FEATURED_POSTS_QUERY } from '../../../lib/queries/posts/allFeaturedPostsQuery'

import FeaturedCard from '../../../components/UI/FeaturedCard'

const FeaturedPosts = () => {
  const { loading, error, data } = useQuery(ALL_FEATURED_POSTS_QUERY)
  const classes = useStyles()

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <Error message='Can not fetch data' />
  }

  return (
    <aside className={classes.root} aria-label='featured-posts'>
      <Typography variant='h6' className={classes.heading}>
        ZOBACZ TAKŻE
      </Typography>
      <Grid
        container
        direction='row'
        justify='center'
        spacing={2}
        className={classes.container}
      >
        {data.allPosts.map((post) => (
          <Grid item key={post.title} xs={12} sm={6} md={4} lg={12}>
            <Link href={`/posts/${post.slug}`}>
              <a>
                <FeaturedCard post={post} />
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </aside>
  )
}

export default FeaturedPosts

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '15px'
  },
  heading: {
    textAlign: `center`,
    color: theme.palette.light.main
  },
  container: {
    marginTop: `30px`
  }
}))
