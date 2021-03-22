import React from 'react'

import useSWR from 'swr'
import { request } from 'graphql-request'
import { ALL_TAGS_QUERY } from '../../lib/queries/tags/allTagsQuery'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Fade from '@material-ui/core/Fade'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'

import SearchIcon from '@material-ui/icons/Search'

import SkeletonCard from '../../components/UI/SkeletonCard'
import SEO from '../../components/SEO'
import TagsContainer from '../../components/tags/TagsContainer'

const TagsPage = (props) => {
  const classes = useStyles()

  const tagsPerPage = 24

  const [tagsToShow, setTagsToShow] = React.useState([])
  const [next, setNext] = React.useState(tagsPerPage)
  const [tagsFound, setTagsFound] = React.useState([])

  const loopWithSlice = (start, end) => {
    const slicedTags = data.allTags.slice(start, end)
    setTagsToShow((prevTags) => [...prevTags, ...slicedTags])
  }

  React.useEffect(() => {
    loopWithSlice(0, tagsPerPage)
  }, [])

  const handleShowMoreTags = () => {
    loopWithSlice(next, next + tagsPerPage)
    setNext(next + tagsPerPage)
  }

  const fetcher = (query) => {
    return request(process.env.NEXT_PUBLIC_API, query)
  }

  const q = ALL_TAGS_QUERY

  const { error, data } = useSWR(q, fetcher, {
    initialData: props.data
  })

  const handleChange = (e) => {
    const tagsFound = data.allTags.filter(
      (tag) =>
        e.target.value !== '' &&
        tag.name.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setTagsFound(tagsFound)
  }

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
        <form className={classes.form} noValidate autoComplete='off'>
          <TextField
            onChange={handleChange}
            className={classes.textField}
            id='outlined-basic'
            label='Szukaj tagu'
            variant='outlined'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </form>
        {tagsFound.length > 0 ? (
          <TagsContainer aria-label='tags-filtered' tags={tagsFound} />
        ) : (
          <TagsContainer aria-label='all-tags' tags={tagsToShow} />
        )}
        <Button
          onChange={handleChange}
          disabled={next >= data._allTagsMeta.count}
          onClick={handleShowMoreTags}
          variant='outlined'
          className={classes.loadMoreButton}
        >
          Wczytaj więcej
        </Button>
      </section>
    </Fade>
  )
}

export default TagsPage

export async function getServerSideProps() {
  const data = await request(process.env.NEXT_PUBLIC_API, ALL_TAGS_QUERY)

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
  form: {
    display: 'block',
    textAlign: 'center',
    margin: '30px auto'
  },
  textField: {
    width: '50%'
  },
  loadMoreButton: {
    display: 'block',
    margin: '30px auto',
    textAlign: 'center',
    color: theme.palette.accent.main
  }
}))
