import React from 'react'
import Link from 'next/link'

import useSWR from 'swr'
import { request } from 'graphql-request'
import { ALL_TAGS_QUERY } from '../../lib/queries/tags/allTagsQuery'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'

import SkeletonCard from '../../components/UI/SkeletonCard'
import SEO from '../../components/SEO'
import LoadMoreButton from '../../components/UI/LoadMoreButton'

const TagsPage = (props) => {
  const classes = useStyles()

  const [skip, setSkip] = React.useState(0)
  const [first, setFirst] = React.useState(24)

  const handleClick = () => {
    setFirst((prev) => prev + 24)
  }
  const fetcher = (query, skip, first) => {
    return request(process.env.NEXT_PUBLIC_API, query, {
      skip,
      first
    })
  }

  const q = ALL_TAGS_QUERY

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
          <Grid item key={x} xs={6} sm={4}>
            <SkeletonCard />
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Fade in timeout={500}>
      <section className={classes.root} aria-label='tags-page'>
        <SEO title='Tagi' description='Zbiór wszystkich tagów.' />
        <Typography variant='h6' className={classes.heading}>
          TAGI
        </Typography>
        <Grid container spacing={2} className={classes.container}>
          {data.allTags.map((tag) => (
            <Fade key={tag.id} in timeout={500}>
              <Grid item xs={6} sm={4}>
                <Link href={`/tags/${tag.slug}`}>
                  <a>
                    <Box component='div' className={classes.tagItem}>
                      <span>#</span>
                      <p>{tag.name}</p>
                    </Box>
                  </a>
                </Link>
              </Grid>
            </Fade>
          ))}
        </Grid>
        <LoadMoreButton
          handleClick={handleClick}
          meta={data._allTagsMeta}
          items={data.allTags}
        />
      </section>
    </Fade>
  )
}

export default TagsPage

export async function getServerSideProps() {
  const data = await request(process.env.NEXT_PUBLIC_API, ALL_TAGS_QUERY, {
    skip: 0,
    first: 24
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
  },
  tagItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.light.main,
    textAlign: 'center',
    fontSize: 'calc(.7rem + .5vw)',
    backgroundColor: 'inherit',
    transition: 'all .2s ease-in-out',
    '& span': {
      color: theme.palette.accent.main
    },
    '&:hover': {
      backgroundColor: theme.palette.muted.darker
    }
  }
}))
