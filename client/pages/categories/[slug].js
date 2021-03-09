import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useQuery } from '@apollo/client'
import { ALL_POSTS_BY_CATEGORY_QUERY } from '../../lib/queries/posts/allPostsByCategoryQuery'
import { SINGLE_CATEGORY_QUERY } from '../../lib/queries/categories/singleCategoryQuery'

import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'

import { makeStyles } from '@material-ui/core/styles'

import Error from '../../components/Error'
import BaseCard from '../../components/UI/BaseCard'
import SkeletonCard from '../../components/UI/SkeletonCard'
import SEO from '../../components/SEO'

const CategoryPage = () => {
  const router = useRouter()
  const { slug } = router.query

  const res1 = useQuery(ALL_POSTS_BY_CATEGORY_QUERY, { variables: { slug } })
  const res2 = useQuery(SINGLE_CATEGORY_QUERY, { variables: { slug } })

  const classes = useStyles()

  if (res1.error || res2.error) {
    return <Error message='Can not fetch data' />
  }

  return (
    <Fade in={true} timeout={500}>
      <main className={classes.root}>
        {res1.loading || res2.loading ? (
          <Grid container spacing={2}>
            {[0, 1, 2, 3, 4, 5].map((x, index) => (
              <Fade key={index} in={true} timeout={500}>
                <Grid item xs={12} sm={6} md={4} lg={6}>
                  <SkeletonCard />
                </Grid>
              </Fade>
            ))}
          </Grid>
        ) : (
          <React.Fragment>
            <SEO
              title={res2.data.allCategories[0].name}
              description={res2.data.allCategories[0].description}
            />
            <Typography variant='h6' className={classes.heading}>
              <span>#</span>
              {res2.data.allCategories[0].name}
            </Typography>
            <Grid container spacing={2} className={classes.container}>
              {res1.data.allPosts.map((post) => (
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
          </React.Fragment>
        )}
      </main>
    </Fade>
  )
}

export default CategoryPage

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
