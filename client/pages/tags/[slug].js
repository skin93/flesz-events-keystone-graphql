import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import { useQuery } from '@apollo/client'
import { ALL_POSTS_BY_TAG_QUERY } from '../../lib/queries/posts/allPostsByTagQuery'
import { SINGLE_TAG_QUERY } from '../../lib/queries/tags/singleTagQuery'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import SEO from '../../components/SEO'
import BaseCard from '../../components/UI/BaseCard'
import SkeletonCard from '../../components/UI/SkeletonCard'
import LoadMoreButton from '../../components/UI/LoadMoreButton'

const TagPage = () => {
  const classes = useStyles()

  const [skip, setSkip] = React.useState(0)
  const [first, setFirst] = React.useState(4)

  const handleClick = () => {
    setFirst((prev) => prev + 4)
  }

  const router = useRouter()
  const { slug } = router.query

  const res1 = useQuery(ALL_POSTS_BY_TAG_QUERY, {
    variables: { slug, skip, first }
  })
  const res2 = useQuery(SINGLE_TAG_QUERY, { variables: { slug } })

  if (res1.error || res2.error) {
    return (
      <div>
        <p>Coś poszło nie tak...</p>
      </div>
    )
  }

  return (
    <section className={classes.root} aria-label='tag-page'>
      {res1.loading || res2.loading ? (
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
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={container}
          >
            {res1.data.allPosts.map((post) => (
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
          <LoadMoreButton
            items={data.allPosts}
            meta={data._allPostsMeta}
            handleClick={handleClick}
          />
        </React.Fragment>
      )}
    </section>
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
