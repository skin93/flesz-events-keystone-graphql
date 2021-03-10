import React from 'react'

import Link from 'next/link'

import { motion } from 'framer-motion'

import { useQuery } from '@apollo/client'
import { ALL_POSTS_QUERY } from '../lib/queries/posts/allPostsQuery'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import BaseCard from '../components/UI/BaseCard'
import SkeletonCard from '../components/UI/SkeletonCard'
import SEO from '../components/SEO'
import Error from '../components/Error'

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
    <section className={classes.root} aria-label='home-page'>
      <SEO />
      <Typography variant='h6' component='h1' className={classes.heading}>
        OSTATNIE WPISY
      </Typography>
      {loading ? (
        <Grid
          container
          spacing={2}
          className={classes.container}
          component={motion.div}
          initial='hidden'
          animate='visible'
          exit='hidden'
          variants={container}
        >
          {[0, 1, 2, 3, 4, 5].map((x) => (
            <Grid
              item
              xs={12}
              md={4}
              key={x}
              component={motion.div}
              initial='hidden'
              animate='visible'
              exit='hidden'
              variants={item}
            >
              <SkeletonCard />
            </Grid>
          ))}
        </Grid>
      ) : (
        <React.Fragment>
          <Grid
            container
            spacing={2}
            className={classes.container}
            component={motion.div}
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={container}
          >
            {data.allPosts.map((post) => (
              <Grid
                item
                key={post.id}
                xs={12}
                sm={6}
                md={4}
                component={motion.div}
                initial='hidden'
                animate='visible'
                exit='hidden'
                variants={item}
              >
                <Link href={`/posts/${post.slug}`}>
                  <a>
                    <BaseCard post={post} />
                  </a>
                </Link>
              </Grid>
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
    </section>
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

const container = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  transition: {
    type: 'spring',
    damping: 20,
    stiffness: 100,
    transition: {
      delayChildren: 0.5
    }
  }
}

const item = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  transition: {
    type: 'spring',
    damping: 20,
    stiffness: 100
  }
}
