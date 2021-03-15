import React from 'react'
import Link from 'next/link'

import { motion } from 'framer-motion'

import { useQuery } from '@apollo/client'
import { ALL_TAGS_QUERY } from '../../lib/queries/tags/allTagsQuery'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import SkeletonCard from '../../components/UI/SkeletonCard'
import SEO from '../../components/SEO'
import LoadMoreButton from '../../components/UI/LoadMoreButton'

const TagsPage = () => {
  const classes = useStyles()

  const [skip, setSkip] = React.useState(0)
  const [first, setFirst] = React.useState(24)

  const handleClick = () => {
    setFirst((prev) => prev + 24)
  }

  const { loading, error, data } = useQuery(ALL_TAGS_QUERY, {
    variables: { skip, first }
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

  return (
    <section className={classes.root} aria-label='tags-page'>
      <SEO title='Tagi' description='Zbiór wszystkich tagów.' />
      {loading ? (
        <Grid
          container
          spacing={2}
          className={classes.container}
          component={motion.div}
          variants={container}
          initial='hidden'
          animate='visible'
          exit='hidden'
        >
          {[0, 1, 2, 3, 4, 5].map((x) => (
            <Grid
              item
              key={x}
              xs={6}
              sm={4}
              component={motion.div}
              variants={item}
              initial='hidden'
              animate='visible'
              exit='hidden'
            >
              <SkeletonCard />
            </Grid>
          ))}
        </Grid>
      ) : (
        <React.Fragment>
          <Typography variant='h6' className={classes.heading}>
            TAGI
          </Typography>
          <Grid
            container
            spacing={2}
            className={classes.container}
            component={motion.div}
            variants={container}
            initial='hidden'
            animate='visible'
            exit='hidden'
          >
            {data.allTags.map((tag) => (
              <Grid
                item
                xs={6}
                sm={4}
                key={tag.id}
                component={motion.div}
                variants={item}
                initial='hidden'
                animate='visible'
                exit='hidden'
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
          <LoadMoreButton
            handleClick={handleClick}
            meta={data._allTagsMeta}
            items={data.allTags}
          />
        </React.Fragment>
      )}
    </section>
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
