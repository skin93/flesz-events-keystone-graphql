import React from 'react'

import Link from 'next/link'

import { motion } from 'framer-motion'

import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import BaseCard from '../../components/UI/BaseCard'
import SkeletonCard from '../../components/UI/SkeletonCard'
import SEO from '../../components/SEO'
import LoadMoreButton from '../../components/UI/LoadMoreButton'

const CategoryTagSlugPage = ({
  loading,
  error,
  posts,
  item,
  meta,
  handleClick
}) => {
  const classes = useStyles()

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

  return (
    <React.Fragment>
      {loading ? (
        <Grid
          container
          spacing={2}
          component={motion.div}
          initial='hidden'
          animate='visible'
          exit='hidden'
          variants={container}
        >
          {[0, 1, 2, 3, 4, 5].map((x) => (
            <Grid
              item
              key={x}
              xs={12}
              sm={6}
              md={4}
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
          <SEO title={item.name} description={item.description} />
          <Typography variant='h6' className={classes.heading}>
            <span>#</span>
            {item.name}
          </Typography>
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
            {posts.map((post) => (
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
          <LoadMoreButton items={posts} meta={meta} handleClick={handleClick} />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default CategoryTagSlugPage

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: `bold`,
    textAlign: `center`,
    textTransform: 'uppercase',
    color: theme.palette.light.main,
    '& span': {
      color: theme.palette.accent.main
    }
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
