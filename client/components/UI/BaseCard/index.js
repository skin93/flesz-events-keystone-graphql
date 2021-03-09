import React from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'

const BaseCard = ({ post }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionsArea}>
        <CardMedia
          className={classes.media}
          image={post.cover_url}
          title={post.title}
          alt={post.title}
        />

        <Chip label={post.category.name} className={classes.chip} />

        <CardContent className={classes.content}>
          <Typography
            gutterBottom
            variant='subtitle1'
            component='h2'
            className={classes.title}
          >
            {post.title}
          </Typography>
          <Typography
            variant='subtitle2'
            component='p'
            className={classes.created}
          >
            {post.createdAt.split('T')[0]}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default BaseCard

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 350,
    position: 'relative',
    borderRadius: '10px'
  },
  actionsArea: {
    height: '100%'
  },
  chip: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '.8em',
    backgroundColor: theme.palette.accent.main,
    color: theme.palette.black.main,
    borderRadius: '10px 0px 0px 0px',
    cursor: 'pointer'
  },
  media: {
    height: 200,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      height: 200
    }
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.main,
    width: '100%',
    height: 150,
    opacity: 0.8
  },
  title: {
    fontWeight: 'bold',
    // fontSize: '0.8vw',
    color: theme.palette.light.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem'
    }
  },
  created: {
    color: theme.palette.muted.main,
    fontWeight: 'bold'
  }
}))
