import React from 'react'
import Link from 'next/link'

import { useQuery } from '@apollo/client'
import { ALL_POSTS_QUERY } from '../lib/queries/posts/allPostsQuery'

import Error from '../components/Error'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'

import { makeStyles } from '@material-ui/core/styles'

import BaseCard from '../components/UI/BaseCard'
import SkeletonCard from '../components/UI/SkeletonCard'

const HomePage = () => {
  const [skip, setSkip] = React.useState(0)
  const [first, setFirst] = React.useState(4)
  const { loading, error, data } = useQuery(ALL_POSTS_QUERY, {
    variables: { skip, first }
  })
  const classes = useStyles()

  const handleClick = () => {
    setFirst((prev) => prev + 4)
  }
  if (error) {
    return <Error message='Coś poszło nie tak :(' />
  }
  return (
    <Fade in={true} timeout={500}>
      <main className={classes.root}>
        <Typography variant='h6' className={classes.heading}>
          OSTATNIE WPISY
        </Typography>
        {loading ? (
          <Grid container spacing={2} className={classes.container}>
            {[0, 1, 2, 3, 4, 5].map((x, index) => (
              <Fade key={index} in={true} timeout={500}>
                <Grid xs={12} item md={6}>
                  <SkeletonCard />
                </Grid>
              </Fade>
            ))}
          </Grid>
        ) : (
          <React.Fragment>
            <Grid container spacing={2} className={classes.container}>
              {data.allPosts.map((post) => (
                <Fade key={post.title} in={true} timeout={500}>
                  <Grid item xs={12} sm={6} md={4} lg={6}>
                    <Link href={`/posts/${post.slug}`}>
                      <a>
                        <BaseCard post={post} />
                      </a>
                    </Link>
                  </Grid>
                </Fade>
              ))}
            </Grid>
            <Button
              onClick={handleClick}
              variant='outlined'
              className={classes.loadMoreButton}
              disabled={data._allPostsMeta.count === data.allPosts.length}
            >
              Wczytaj więcej
            </Button>
          </React.Fragment>
        )}
      </main>
    </Fade>
  )
}

export default HomePage

const useStyles = makeStyles((theme) => ({
  root: { padding: '15px' },
  heading: {
    textAlign: `center`,
    color: theme.palette.light.main
  },
  container: {
    marginTop: `30px`
  },
  loadMoreButton: {
    display: 'block',
    margin: '30px auto',
    fontWeight: 'bold',
    color: theme.palette.accent.main
  }
}))
