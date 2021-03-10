import React from 'react'
import Link from 'next/link'

import { motion } from 'framer-motion'

import { useQuery } from '@apollo/client'
import { ALL_TAGS_QUERY } from '../../lib/queries/tags/allTagsQuery'

import Error from '../../components/Error'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
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
    <main className={classes.root}>
      <Typography variant='h6' className={classes.heading}>
        TAGI
      </Typography>
      {loading ? (
        <Grid
          container
          spacing={2}
          className={classes.container}
          component={motion.div}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 100,
            transition: {
              delayChildren: 0.5
            }
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[0, 1, 2, 3, 4, 5].map((x) => (
            <Grid
              item
              key={x}
              xs={12}
              md={6}
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SkeletonCard />
            </Grid>
          ))}
        </Grid>
      ) : (
        <React.Fragment>
          <SEO title='Tagi' description='Zbiór wszystkich tagów.' />
          <Grid
            container
            spacing={2}
            className={classes.container}
            component={motion.div}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 100,
              transition: {
                delayChildren: 0.5
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {data.allTags.map((tag) => (
              <Grid
                item
                xs={6}
                sm={4}
                key={tag.id}
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
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
