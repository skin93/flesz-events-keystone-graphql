import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_POSTS_QUERY } from '../lib/queries/posts/allPostsQuery'

import Grid from '@material-ui/core/Grid'
import Error from '../components/Error'
import { Typography } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import BaseCard from '../components/UI/BaseCard'

const HomePage = () => {
  const { loading, error, data } = useQuery(ALL_POSTS_QUERY)
  const classes = useStyles()

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <Error message='Can not fetch data' />
  }
  return (
    <main className={classes.root}>
      <Typography variant='h4' className={classes.heading}>
        OSTATNIE WPISY
      </Typography>
      <Grid
        container
        direction='row'
        justify='center'
        className={classes.container}
        spacing={2}
      >
        {data.allPosts.map((post) => (
          <Grid item key={post.title}>
            <BaseCard post={post} />
          </Grid>
        ))}
      </Grid>
    </main>
  )
}

export default HomePage

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `30px 0`
  },
  heading: {
    textAlign: `center`,
    color: theme.palette.light.main
  },
  container: {
    marginTop: `30px`
  }
}))
