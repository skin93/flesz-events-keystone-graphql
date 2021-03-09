import React from 'react'
import Link from 'next/link'

import { useQuery } from '@apollo/client'
import { ALL_TAGS_QUERY } from '../../lib/queries/tags/allTagsQuery'

import Error from '../../components/Error'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import { makeStyles } from '@material-ui/core/styles'

import SkeletonCard from '../../components/UI/SkeletonCard'
import SEO from '../../components/SEO'

const TagsPage = () => {
  const [skip, setSkip] = React.useState(0)
  const [first, setFirst] = React.useState(6)
  const { loading, error, data } = useQuery(ALL_TAGS_QUERY, {
    variables: { skip, first }
  })
  const classes = useStyles()

  const handleClick = () => {
    setFirst((prev) => prev + 6)
  }

  if (error) {
    return <Error message='Coś poszło nie tak :(' />
  }

  return (
    <Fade in={true} timeout={500}>
      <main className={classes.root}>
        <Typography variant='h6' className={classes.heading}>
          TAGI
        </Typography>
        {loading ? (
          <Grid container spacing={2} className={classes.container}>
            {[0, 1, 2, 3, 4, 5].map((x, index) => (
              <Fade key={index} in={true} timeout={500}>
                <Grid xs={12} item md={6}>
                  <SkeletonCard />
                </Grid>
              </Fade>
            ))}
          </Grid>
        ) : (
          <React.Fragment>
            <SEO title='Tagi' description='Zbiór wszystkich tagów.' />
            <Grid container spacing={2} className={classes.container}>
              {data.allTags.map((tag) => (
                <Fade key={tag.slug} in={true} timeout={500}>
                  <Grid
                    item
                    xs={6}
                    sm={4}
                    // className={classes.tagItem
                  >
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
            <Button
              onClick={handleClick}
              variant='outlined'
              className={classes.loadMoreButton}
              disabled={data._allTagsMeta.count === data.allTags.length}
            >
              Wczytaj więcej
            </Button>
          </React.Fragment>
        )}
      </main>
    </Fade>
  )
}

export default TagsPage

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
