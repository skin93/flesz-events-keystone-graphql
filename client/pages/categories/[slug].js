import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useQuery } from '@apollo/client'
import { ALL_POSTS_BY_CATEGORY_QUERY } from '../../lib/queries/posts/allPostsByCategoryQuery'
import { SINGLE_CATEGORY_QUERY } from '../../lib/queries/categories/singleCategoryQuery'
import Grid from '@material-ui/core/Grid'
import Error from '../../components/Error'
import { Typography } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import BaseCard from '../../components/UI/BaseCard'

const CategoryPage = () => {
  const router = useRouter()
  const { slug } = router.query

  const res1 = useQuery(ALL_POSTS_BY_CATEGORY_QUERY, { variables: { slug } })
  const res2 = useQuery(SINGLE_CATEGORY_QUERY, { variables: { slug } })

  const classes = useStyles()

  if (res1.loading || res2.loading) {
    return <div>Loading...</div>
  }
  if (res1.error || res2.error) {
    return <Error message='Can not fetch data' />
  }
  return (
    <main className={classes.root}>
      <Typography variant='h4' className={classes.heading}>
        <span>#</span>
        {res2.data.allCategories[0].name}
      </Typography>
      <Grid
        container
        direction='row'
        justify='center'
        className={classes.container}
        spacing={2}
      >
        {res1.data.allPosts.map((post) => (
          <Grid item key={post.title}>
            <Link href={`/posts/${post.slug}`}>
              <a>
                <BaseCard post={post} />
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </main>
  )
}

export default CategoryPage

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `30px 0`
  },
  heading: {
    fontWeight: `bold`,
    textAlign: `center`,
    color: theme.palette.light.main,
    '& span': {
      color: theme.palette.accent.main
    }
  },
  container: {
    marginTop: `30px`
  }
}))
