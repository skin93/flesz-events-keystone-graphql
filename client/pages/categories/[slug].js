import React from 'react'

import Link from 'next/link'

import { motion } from 'framer-motion'

import { useRouter } from 'next/router'

import { useQuery } from '@apollo/client'
import { ALL_POSTS_BY_CATEGORY_QUERY } from '../../lib/queries/posts/allPostsByCategoryQuery'
import { SINGLE_CATEGORY_QUERY } from '../../lib/queries/categories/singleCategoryQuery'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import BaseCard from '../../components/UI/BaseCard'
import SkeletonCard from '../../components/UI/SkeletonCard'
import SEO from '../../components/SEO'
import LoadMoreButton from '../../components/UI/LoadMoreButton'

const CategoryPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const { slug } = router.query

  const [skip, setSkip] = React.useState(0)
  const [first, setFirst] = React.useState(6)

  const handleClick = () => {
    setFirst((prev) => prev + 6)
  }

  const res1 = useQuery(ALL_POSTS_BY_CATEGORY_QUERY, {
    variables: { slug, skip, first }
  })
  const res2 = useQuery(SINGLE_CATEGORY_QUERY, { variables: { slug } })

  const loading = res1.loading || res2.loading
  const error = res1.error || res2.error

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

  if (loading) {
    return (
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
    )
  }

  const posts = res1.data?.allPosts
  const meta = res1.data?._allPostsMeta
  const category = res2.data?.allCategories[0]

  return (
    <section style={{ padding: '15px' }} aria-label='category-page'>
      <SEO title={category.name} description={category.description} />
      <Typography variant='h6' className={classes.heading}>
        <span>#</span>
        {category.name}
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
    </section>
  )
}

export default CategoryPage

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
