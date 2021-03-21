import React from 'react'

import Link from 'next/link'

import { useRouter } from 'next/router'

import useSWR from 'swr'
import { request } from 'graphql-request'
import { ALL_POSTS_BY_CATEGORY_QUERY } from '../../lib/queries/posts/allPostsByCategoryQuery'
import { SINGLE_CATEGORY_QUERY } from '../../lib/queries/categories/singleCategoryQuery'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import BaseCard from '../../components/UI/BaseCard'
import SkeletonCard from '../../components/UI/SkeletonCard'
import SEO from '../../components/SEO'
import LoadMoreButton from '../../components/UI/LoadMoreButton'

const CategoryPage = (props) => {
  const classes = useStyles()
  const router = useRouter()
  const { slug } = router.query

  const [skip, setSkip] = React.useState(0)
  const [first, setFirst] = React.useState(6)

  const handleClick = () => {
    setFirst((prev) => prev + 6)
  }

  const postsQuery = ALL_POSTS_BY_CATEGORY_QUERY
  const categoryQuery = SINGLE_CATEGORY_QUERY

  const postsFetcher = (query, slug, skip, first) =>
    request(process.env.NEXT_PUBLIC_API, query, { slug, skip, first })

  const categoryFetcher = (query, slug) =>
    request(process.env.NEXT_PUBLIC_API, query, { slug })

  const res1 = useSWR([postsQuery, slug, skip, first], postsFetcher, {
    initialData: props.postsData
  })

  const res2 = useSWR([categoryQuery, slug], categoryFetcher, {
    initialData: props.categoryData
  })

  const loading = !res1.data || !res2.data
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
      <Grid container spacing={2}>
        {[0, 1, 2, 3, 4, 5].map((x) => (
          <Grid item key={x} xs={12} sm={6} md={4}>
            <SkeletonCard />
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <section style={{ padding: '15px' }} aria-label='category-page'>
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
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Link href={`/posts/${post.slug}`}>
              <a>
                <BaseCard post={post} />
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
      <LoadMoreButton
        items={res1.data.allPosts}
        meta={res1.data._allPostsMeta}
        handleClick={handleClick}
      />
    </section>
  )
}

export default CategoryPage

export async function getServerSideProps({ params }) {
  const postsData = await request(
    process.env.NEXT_PUBLIC_API,
    ALL_POSTS_BY_CATEGORY_QUERY,
    {
      slug: params.slug,
      skip: 0,
      first: 6
    }
  )

  const categoryData = await request(
    process.env.NEXT_PUBLIC_API,
    SINGLE_CATEGORY_QUERY,
    {
      slug: params.slug
    }
  )

  return {
    props: { postsData, categoryData }
  }
}

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
