import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useQuery } from '@apollo/client'
import { ALL_POSTS_BY_CATEGORY_QUERY } from '../../lib/queries/posts/allPostsByCategoryQuery'
import { SINGLE_CATEGORY_QUERY } from '../../lib/queries/categories/singleCategoryQuery'
import Error from '../../components/Error'
import { Typography } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import BaseCard from '../../components/UI/BaseCard'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

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
      <Typography variant='h6' className={classes.heading}>
        <span>#</span>
        {res2.data.allCategories[0].name}
      </Typography>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 0: 1, 600: 2, 960: 3 }}
        className={classes.container}
      >
        <Masonry gutter={10}>
          {res1.data.allPosts.map((post) => (
            <Link key={post.title} href={`/posts/${post.slug}`}>
              <a>
                <BaseCard post={post} />
              </a>
            </Link>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </main>
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
