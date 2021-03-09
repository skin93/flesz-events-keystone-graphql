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
        <CardContent className={classes.content}>
          <Link href={`/categories/${post.category.slug}`}>
            <a>
              <Typography
                gutterBottom
                variant='button'
                className={classes.category}
              >
                {post.category.name}
              </Typography>
            </a>
          </Link>
          <Typography
            // gutterBottom
            variant='subtitle1'
            component='h2'
            className={classes.title}
          >
            {post.title}
          </Typography>
          <Typography variant='caption' className={classes.created}>
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
  category: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '.8em',
    color: theme.palette.accent.main,
    cursor: 'pointer'
  },
  media: {
    height: 200,
    [theme.breakpoints.down('sm')]: {
      height: 200
    }
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: theme.palette.background.main,
    width: '100%',
    height: 150
  },
  title: {
    fontWeight: 'bold',
    fontSize: 'calc(1.2em + 0.1vw)',
    color: theme.palette.light.main
  },
  created: {
    color: theme.palette.muted.main,
    fontWeight: 'bold'
  }
}))
