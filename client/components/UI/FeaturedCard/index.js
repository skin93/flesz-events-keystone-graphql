import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const FeaturedCard = ({ post }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component='img'
          className={classes.media}
          image={post.cover_url}
          title={post.title}
          alt={post.title}
        />
        <CardContent className={classes.content}>
          <Typography
            gutterBottom
            variant='subtitle2'
            component='h2'
            className={classes.title}
          >
            {post.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default FeaturedCard

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: 150,
    marginBottom: '10px',
    borderRadius: '10px'
  },
  actionsArea: {
    height: 150
  },
  media: {
    height: 150
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: theme.palette.background.main,

    opacity: 0.8
  },
  title: {
    fontWeight: 'bold',
    color: theme.palette.light.main,
    margin: 0
  }
}))
