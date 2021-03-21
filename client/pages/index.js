import React from 'react'

import Link from 'next/link'

import useSWR from 'swr'
import { request } from 'graphql-request'
import { ALL_POSTS_QUERY } from '../lib/queries/posts/allPostsQuery'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Fade from '@material-ui/core/Fade'

import BaseCard from '../components/UI/BaseCard'
import SkeletonCard from '../components/UI/SkeletonCard'
import SEO from '../components/SEO'
import LoadMoreButton from '../components/UI/LoadMoreButton'

const HomePage = (props) => {
  const classes = useStyles()

  const [skip, setSkip] = React.useState(0)
  const [first, setFirst] = React.useState(6)

  const handleClick = () => {
    setFirst((prev) => prev + 6)
  }

  const fetcher = (query, skip, first) => {
    return request(process.env.NEXT_PUBLIC_API, query, {
      skip,
      first
    })
  }

  const q = ALL_POSTS_QUERY

  const { error, data } = useSWR([q, skip, first], fetcher, {
    initialData: props.data
  })

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

  if (!data) {
    return (
      <Grid container spacing={2} className={classes.container}>
        {[0, 1, 2, 3, 4, 5].map((x) => (
          <Grid item xs={12} md={4} key={x}>
            <SkeletonCard />
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Fade in timeout={500}>
      <section className={classes.root} aria-label='home-page'>
        <SEO />
        <Typography variant='h6' component='h1' className={classes.heading}>
          OSTATNIE WPISY
        </Typography>
        <Grid container spacing={2} className={classes.container}>
          {data.allPosts.map((post) => (
            <Fade in timeout={500} key={post.id}>
              <Grid item xs={12} sm={6} md={4}>
                <Link href={`/posts/${post.slug}`}>
                  <a>
                    <BaseCard post={post} />
                  </a>
                </Link>
              </Grid>
            </Fade>
          ))}
        </Grid>
        <LoadMoreButton
          handleClick={handleClick}
          meta={data._allPostsMeta}
          items={data.allPosts}
        />
      </section>
    </Fade>
  )
}

export default HomePage

export async function getServerSideProps() {
  const data = await request(process.env.NEXT_PUBLIC_API, ALL_POSTS_QUERY, {
    skip: 0,
    first: 6
  })

  return {
    props: { data }
  }
}

const useStyles = makeStyles((theme) => ({
  root: { padding: '15px' },
  heading: {
    textAlign: `center`,
    color: theme.palette.light.main
  },
  container: {
    marginTop: `30px`
  }
}))
