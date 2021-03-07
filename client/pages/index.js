import React from 'react'
import Link from 'next/link'

import { useQuery } from '@apollo/client'
import { ALL_POSTS_QUERY } from '../lib/queries/posts/allPostsQuery'

import Error from '../components/Error'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'

import { makeStyles } from '@material-ui/core/styles'

import BaseCard from '../components/UI/BaseCard'
import SkeletonCard from '../components/UI/SkeletonCard'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

const HomePage = () => {
  const [skip, setSkip] = React.useState(0)
  const [first, setFirst] = React.useState(1)
  const { loading, error, data } = useQuery(ALL_POSTS_QUERY, {
    variables: { skip, first }
  })
  const classes = useStyles()

  const handleClick = () => {
    setFirst((prev) => prev + 1)
  }
  if (error) {
    return <Error message='Coś poszło nie tak :(' />
  }
  return (
    <Fade in='true' timeout={500}>
      <main className={classes.root}>
        <Typography variant='h6' className={classes.heading}>
          OSTATNIE WPISY
        </Typography>
        {loading ? (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 0: 1, 600: 2, 960: 3 }}
            className={classes.container}
          >
            <Masonry gutter={10}>
              {[0, 1, 2, 3, 4, 5].map((x, index) => (
                <SkeletonCard key={index} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        ) : (
          <React.Fragment>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 0: 1, 600: 2, 960: 3 }}
              className={classes.container}
            >
              <Masonry gutter={10}>
                {data.allPosts.map((post) => (
                  <Link key={post.title} href={`/posts/${post.slug}`}>
                    <a>
                      <BaseCard post={post} />
                    </a>
                  </Link>
                ))}
              </Masonry>
            </ResponsiveMasonry>
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
      </main>
    </Fade>
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
