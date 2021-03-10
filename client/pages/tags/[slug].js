import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import { useQuery } from '@apollo/client'
import { ALL_POSTS_BY_TAG_QUERY } from '../../lib/queries/posts/allPostsByTagQuery'
import { SINGLE_TAG_QUERY } from '../../lib/queries/tags/singleTagQuery'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import { makeStyles } from '@material-ui/core/styles'

import Error from '../../components/Error'
import SEO from '../../components/SEO'
import BaseCard from '../../components/UI/BaseCard'
import SkeletonCard from '../../components/UI/SkeletonCard'

const TagPage = () => {
  const router = useRouter()
  const { slug } = router.query

  const res1 = useQuery(ALL_POSTS_BY_TAG_QUERY, { variables: { slug } })
  const res2 = useQuery(SINGLE_TAG_QUERY, { variables: { slug } })

  const classes = useStyles()

  if (res1.error || res2.error) {
    return <Error message='Can not fetch data' />
  }

  return (
    <main className={classes.root}>
      {res1.loading || res2.loading ? (
        <Grid
          container
          spacing={2}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 100,
            transition: {
              delayChildren: 0.5
            }
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((x) => (
            <Grid
              item
              key={x}
              xs={12}
              sm={6}
              md={4}
              lg={6}
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SkeletonCard />
            </Grid>
          ))}
        </Grid>
      ) : (
        <React.Fragment>
          <SEO
            title={res2.data.allTags[0].name}
            decription={res2.data.allTags[0].description}
          />
          <Typography variant='h6' className={classes.heading}>
            <span>#</span>
            {res2.data.allTags[0].name}
          </Typography>
          <Grid
            container
            spacing={2}
            className={classes.container}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 100,
              transition: {
                delayChildren: 0.5
              }
            }}
          >
            {res1.data.allPosts.map((post) => (
              <Grid
                item
                key={post.id}
                xs={12}
                sm={6}
                md={4}
                lg={6}
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Link href={`/posts/${post.slug}`}>
                  <a>
                    <BaseCard post={post} />
                  </a>
                </Link>
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      )}
    </main>
  )
}

export default TagPage

const useStyles = makeStyles((theme) => ({
  root: { padding: '15px' },
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
  }
}))
